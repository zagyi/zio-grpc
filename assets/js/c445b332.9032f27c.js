"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[869],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=a.createContext({}),l=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=l(e.components);return a.createElement(o.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(t),m=i,h=u["".concat(o,".").concat(m)]||u[m]||d[m]||r;return t?a.createElement(h,s(s({ref:n},p),{},{components:t})):a.createElement(h,s({ref:n},p))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,s=new Array(r);s[0]=u;var c={};for(var o in n)hasOwnProperty.call(n,o)&&(c[o]=n[o]);c.originalType=e,c.mdxType="string"==typeof e?e:i,s[1]=c;for(var l=2;l<r;l++)s[l]=t[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3713:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return d}});var a=t(3117),i=t(102),r=(t(7294),t(3905)),s=["components"],c={title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},o=void 0,l={unversionedId:"deadlines",id:"deadlines",title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",source:"@site/../zio-grpc-docs/target/mdoc/deadlines.md",sourceDirName:".",slug:"/deadlines",permalink:"/zio-grpc/docs/next/deadlines",draft:!1,editUrl:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md",tags:[],version:"current",frontMatter:{title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},sidebar:"someSidebar",previous:{title:"Decorating services",permalink:"/zio-grpc/docs/next/decorating"},next:{title:"Scala.js",permalink:"/zio-grpc/docs/next/scala.js"}},p={},d=[{value:"Setting timeout for all requests",id:"setting-timeout-for-all-requests",level:2},{value:"Setting timeout for each request",id:"setting-timeout-for-each-request",level:2}],u={toc:d};function m(e){var n=e.components,t=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When you use a gRPC it is ",(0,r.kt)("a",{parentName:"p",href:"https://grpc.io/blog/deadlines/"},"a very important to set deadlines"),".\nIn gRPC, deadlines are absolute timestamps that tell our system when the response of an RPC call is\nno longer needed. The deadline is sent to the server, and the computation is automatically interrupted\nwhen the deadline is exceeded. The client call automatically ends with a ",(0,r.kt)("inlineCode",{parentName:"p"},"Status.DEADLINE_EXCEEDED")," error."),(0,r.kt)("p",null,"When you don't specify a deadline, client requests never timeout. All in-flight requests take\nresources on the server, and possibly upstream servers, which can ultimately hurt latency or crash\nthe entire process."),(0,r.kt)("p",null,"In ZIO gRPC you can easily set deadlines (absolute timestamps), or timeouts which are relative to\nthe time the outbound call is made."),(0,r.kt)("h2",{id:"setting-timeout-for-all-requests"},"Setting timeout for all requests"),(0,r.kt)("p",null,"To set the same timeout for all requests, it is possible to provide an effect that produces ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions"),"\nwhen constructing the client. This effect is invoked before each request, and can determine the deadline\nrelative to the system clock at the time the effect is executed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'import myexample.testservice.ZioTestservice.ServiceNameClient\nimport myexample.testservice.{Request, Response}\nimport scalapb.zio_grpc.{ZManagedChannel, SafeMetadata}\nimport io.grpc.ManagedChannelBuilder\nimport io.grpc.CallOptions\nimport java.util.concurrent.TimeUnit\nimport zio._\nimport zio.Console._\n\nval channel = ZManagedChannel(\n  ManagedChannelBuilder\n    .forAddress("localhost", 8980)\n    .usePlaintext()\n)\n// channel: ZManagedChannel[Any] = OnSuccess(\n//   trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:16)",\n//   first = Sync(\n//     trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:16)",\n//     eval = zio.ZIO$$$Lambda$12924/568091213@79582c86\n//   ),\n//   successK = zio.ZIO$$$Lambda$12925/1510625061@28e8640b\n// )\n\n// create layer:\nval clientLayer = ServiceNameClient.live(\n  channel,\n  options=ZIO.succeed(\n    CallOptions.DEFAULT.withDeadlineAfter(3000, TimeUnit.MILLISECONDS)),\n  headers=SafeMetadata.make)\n// clientLayer: ZLayer[Any, Throwable, ServiceNameClient.ZService[Any, Any]] = Fold(\n//   self = Suspend(self = zio.ZLayer$$$Lambda$12856/1140235988@20c8828),\n//   failure = zio.ZLayer$$Lambda$12955/65216994@60bfd419,\n//   success = zio.ZLayer$$Lambda$12953/213280790@408d30e2\n// )\n\nval myAppLogicNeedsEnv = for {\n  // use layer through accessor methods:\n  res <- ServiceNameClient.unary(Request())\n  _ <- printLine(res.toString)\n} yield ()\n// myAppLogicNeedsEnv: ZIO[ServiceNameClient.ZService[Any, Any] with Any, Object, Unit] = OnSuccess(\n//   trace = "repl.MdocSession.MdocApp.myAppLogicNeedsEnv(deadlines.md:48)",\n//   first = OnSuccess(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:60)",\n//     first = Sync(\n//       trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:60)",\n//       eval = zio.ZIO$ServiceWithZIOPartiallyApplied$$$Lambda$12957/1273709933@139d1328\n//     ),\n//     successK = zio.ZIO$$$Lambda$12925/1510625061@28e8640b\n//   ),\n//   successK = <function1>\n// )\n')),(0,r.kt)("h2",{id:"setting-timeout-for-each-request"},"Setting timeout for each request"),(0,r.kt)("p",null,"As in the previous example, assuming there is a client in the environment, we can set the timeout\nfor each request like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'ServiceNameClient.withTimeoutMillis(3000).unary(Request())\n// res0: ZIO[ServiceNameClient.ZService[Any, Any] with Any, io.grpc.Status, Response] = OnSuccess(\n//   trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:60)",\n//   first = Sync(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:60)",\n//     eval = zio.ZIO$ServiceWithZIOPartiallyApplied$$$Lambda$12957/1273709933@6e4fa48\n//   ),\n//   successK = zio.ZIO$$$Lambda$12925/1510625061@28e8640b\n// )\n')),(0,r.kt)("p",null,"Clients provide (through the ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptionsMethods")," trait) a number of methods that make it possible\nto specify a deadline or a timeout for each request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"// Provide a new absolute deadline\ndef withDeadline(deadline: Deadline): Service\n\n// Sets a new timeout for this service\ndef withTimeout(duration: zio.duration.Duration): Service\n\n// Sets a new timeout in millis\ndef withTimeoutMillis(millis: Long): Service\n\n// Replace the call options with the provided call options\ndef withCallOptions(callOptions: CallOptions): Service\n\n// Effectfully update the CallOptions for this service\ndef mapCallOptionsM(f: CallOptions => zio.IO[Status, CallOptions]): Service\n")),(0,r.kt)("p",null,"If you are using a client instance, the above methods are available to provide you with a new\nclient that has a modified ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions")," effect. Making the copy of those clients is cheap and can\nbe safely done for each individual call:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'val clientScoped = ServiceNameClient.scoped(channel)\n// clientScoped: ZIO[Scope, Throwable, ServiceNameClient.ZService[Any, Any]] = OnSuccess(\n//   trace = "myexample.testservice.ZioTestservice.ServiceNameClient.scoped(ZioTestservice.scala:112)",\n//   first = OnSuccess(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameClientWithMetadata.scoped(ZioTestservice.scala:183)",\n//     first = OnSuccess(\n//       trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:16)",\n//       first = Sync(\n//         trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:16)",\n//         eval = zio.ZIO$$$Lambda$12924/568091213@79582c86\n//       ),\n//       successK = zio.ZIO$$$Lambda$12925/1510625061@28e8640b\n//     ),\n//     successK = zio.ZIO$$Lambda$12938/412867147@18e5e991\n//   ),\n//   successK = zio.ZIO$$Lambda$12938/412867147@31c6d04f\n// )\n\nval myAppLogic = ZIO.scoped {\n  clientScoped.flatMap { client => \n    for {\n      res <- client\n               .withTimeoutMillis(3000).unary(Request())\n               .mapError(_.asRuntimeException)\n    } yield res\n  }\n}\n// myAppLogic: ZIO[Any, Throwable, Response] = OnSuccess(\n//   trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:65)",\n//   first = OnSuccess(\n//     trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:65)",\n//     first = Sync(\n//       trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:65)",\n//       eval = zio.Scope$ReleaseMap$$$Lambda$12964/964986672@4ab9910c\n//     ),\n//     successK = zio.ZIO$$Lambda$12938/412867147@6b2e04a9\n//   ),\n//   successK = zio.ZIO$ScopedPartiallyApplied$$$Lambda$12966/1334062991@5c30c13c\n// )\n')))}m.isMDXComponent=!0}}]);