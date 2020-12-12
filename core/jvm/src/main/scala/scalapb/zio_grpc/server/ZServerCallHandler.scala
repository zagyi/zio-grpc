package scalapb.zio_grpc.server

import zio._
import io.grpc.ServerCall.Listener
import io.grpc.Status
import zio.stream.{Stream, ZSink, ZStream}
import io.grpc.ServerCall
import io.grpc.ServerCallHandler
import scalapb.zio_grpc.RequestContext
import io.grpc.Metadata
import scalapb.zio_grpc.SafeMetadata

class ZServerCallHandler[R, Req, Res](
    runtime: Runtime[R],
    mkDriver: (ZServerCall[Res], RequestContext) => URIO[R, CallDriver[R, Req]]
) extends ServerCallHandler[Req, Res] {
  def startCall(
      call: ServerCall[Req, Res],
      headers: Metadata
  ): Listener[Req] = {
    val zioCall = new ZServerCall(call)
    val runner  = for {
      md     <- SafeMetadata.fromMetadata(headers)
      rc     <- RequestContext.fromServerCall(md, call)
      driver <- mkDriver(zioCall, rc)
      // Why forkDaemon? we need the driver to keep runnning in the background after we return a listener
      // back to grpc-java. If it was just fork, the call to unsafeRun would not return control, so grpc-java
      // won't have a listener to call on.  The driver awaits on the calls to the listener to pass to the user's
      // service.
      _      <- driver.run.forkDaemon
    } yield driver.listener

    runtime.unsafeRun(runner)
  }
}

object ZServerCallHandler {
  def unaryInput[R, Req, Res](
      runtime: Runtime[R],
      impl: (Req, RequestContext, ZServerCall[Res]) => ZIO[R, Status, Unit]
  ): ServerCallHandler[Req, Res] =
    new ZServerCallHandler(runtime, CallDriver.makeUnaryInputCallDriver(impl))

  def streamingInput[R, Req, Res](
      runtime: Runtime[R],
      impl: (
          Stream[Status, Req],
          RequestContext,
          ZServerCall[Res]
      ) => ZIO[R, Status, Unit]
  ): ServerCallHandler[Req, Res] =
    new ZServerCallHandler(
      runtime,
      CallDriver.makeStreamingInputCallDriver(impl)
    )

  def unaryCallHandler[Req, Res](
      runtime: Runtime[Any],
      impl: Req => ZIO[Has[RequestContext], Status, Res]
  ): ServerCallHandler[Req, Res] =
    unaryInput(
      runtime,
      (req, requestContext, call) =>
        impl(req).provide(Has(requestContext)).flatMap[Any, Status, Unit] { res =>
          call.sendHeaders(requestContext.responseMetadata) *>
            call.sendMessage(res)
        }
    )

  // A sink that sends RequestContext.responseMetadata when the first element
  // is available. If the stream was empty, it sends the metadata upon
  // termination.
  // TODO(): would not send headers after stream ends
  private def streamSink[Res](rc: RequestContext, call: ZServerCall[Res]) =
    ZSink
      .foldLeftM[Any, Status, Res, Int](0) { case (index, res) =>
        (if (index == 0) call.sendHeaders(rc.responseMetadata) *> call.sendMessage(res)
         else call.sendMessage(res)).as(index + 1)
      }
      .as(())

  def serverStreamingCallHandler[Req, Res](
      runtime: Runtime[Any],
      impl: Req => ZStream[Has[RequestContext], Status, Res]
  ): ServerCallHandler[Req, Res] =
    unaryInput(
      runtime,
      (req: Req, requestContext: RequestContext, call: ZServerCall[Res]) =>
        impl(req).provide(Has(requestContext)).run(streamSink(requestContext, call))
    )

  def clientStreamingCallHandler[Req, Res](
      runtime: Runtime[Any],
      impl: Stream[Status, Req] => ZIO[Has[RequestContext], Status, Res]
  ): ServerCallHandler[Req, Res] =
    streamingInput(
      runtime,
      (req, requestContext, call) =>
        impl(req).provide(Has(requestContext)).flatMap[Any, Status, Unit] { res =>
          call.sendHeaders(requestContext.responseMetadata) *> call.sendMessage(res)
        }
    )

  def bidiCallHandler[Req, Res](
      runtime: Runtime[Any],
      impl: Stream[Status, Req] => ZStream[Has[RequestContext], Status, Res]
  ): ServerCallHandler[Req, Res] =
    streamingInput(
      runtime,
      (req, requestContext, call) => impl(req).provide(Has(requestContext)).run(streamSink(requestContext, call))
    )
}
