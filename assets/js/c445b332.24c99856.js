"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[869],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=a.createContext({}),l=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),m=i,f=u["".concat(o,".").concat(m)]||u[m]||d[m]||r;return n?a.createElement(f,s(s({ref:t},p),{},{components:n})):a.createElement(f,s({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=u;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:i,s[1]=c;for(var l=2;l<r;l++)s[l]=n[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3713:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return d}});var a=n(3117),i=n(102),r=(n(7294),n(3905)),s=["components"],c={title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},o=void 0,l={unversionedId:"deadlines",id:"deadlines",title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",source:"@site/../zio-grpc-docs/target/mdoc/deadlines.md",sourceDirName:".",slug:"/deadlines",permalink:"/zio-grpc/docs/next/deadlines",draft:!1,editUrl:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md",tags:[],version:"current",frontMatter:{title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},sidebar:"someSidebar",previous:{title:"Decorating services",permalink:"/zio-grpc/docs/next/decorating"},next:{title:"Scala.js",permalink:"/zio-grpc/docs/next/scala.js"}},p={},d=[{value:"Setting timeout for all requests",id:"setting-timeout-for-all-requests",level:2},{value:"Setting timeout for each request",id:"setting-timeout-for-each-request",level:2}],u={toc:d};function m(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When you use a gRPC it is ",(0,r.kt)("a",{parentName:"p",href:"https://grpc.io/blog/deadlines/"},"a very important to set deadlines"),".\nIn gRPC, deadlines are absolute timestamps that tell our system when the response of an RPC call is\nno longer needed. The deadline is sent to the server, and the computation is automatically interrupted\nwhen the deadline is exceeded. The client call automatically ends with a ",(0,r.kt)("inlineCode",{parentName:"p"},"Status.DEADLINE_EXCEEDED")," error."),(0,r.kt)("p",null,"When you don't specify a deadline, client requests never timeout. All in-flight requests take\nresources on the server, and possibly upstream servers, which can ultimately hurt latency or crash\nthe entire process."),(0,r.kt)("p",null,"In ZIO gRPC you can easily set deadlines (absolute timestamps), or timeouts which are relative to\nthe time the outbound call is made."),(0,r.kt)("h2",{id:"setting-timeout-for-all-requests"},"Setting timeout for all requests"),(0,r.kt)("p",null,"To set the same timeout for all requests, it is possible to provide an effect that produces ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions"),"\nwhen constructing the client. This effect is invoked before each request, and can determine the deadline\nrelative to the system clock at the time the effect is executed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'import myexample.testservice.ZioTestservice.ServiceNameClient\nimport myexample.testservice.{Request, Response}\nimport scalapb.zio_grpc.{ZManagedChannel, SafeMetadata}\nimport io.grpc.ManagedChannelBuilder\nimport io.grpc.CallOptions\nimport java.util.concurrent.TimeUnit\nimport zio._\nimport zio.Console._\n\nval channel = ZManagedChannel(\n  ManagedChannelBuilder\n    .forAddress("localhost", 8980)\n    .usePlaintext()\n)\n// channel: ZManagedChannel = OnSuccess(\n//   trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:11)",\n//   first = Sync(\n//     trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:11)",\n//     eval = zio.ZIO$$$Lambda$13091/1316864982@5acabfaf\n//   ),\n//   successK = zio.ZIO$$$Lambda$13021/1100525026@14ce619f\n// )\n\n// create layer:\nval clientLayer = ServiceNameClient.live(\n  channel,\n  options=CallOptions.DEFAULT.withDeadlineAfter(3000, TimeUnit.MILLISECONDS),\n  metadata=SafeMetadata.make)\n// clientLayer: ZLayer[Any, Throwable, ServiceNameClient] = Fold(\n//   self = Suspend(\n//     self = zio.ZLayer$ScopedEnvironmentPartiallyApplied$$$Lambda$13034/432130326@36244198\n//   ),\n//   failure = zio.ZLayer$$Lambda$13106/80570670@6ed1f9b5,\n//   success = zio.ZLayer$$Lambda$13104/1113289826@6a92876e\n// )\n\nval myAppLogicNeedsEnv = for {\n  // use layer through accessor methods:\n  res <- ServiceNameClient.unary(Request())\n  _ <- printLine(res.toString)\n} yield ()\n// myAppLogicNeedsEnv: ZIO[ServiceNameClient, Object, Unit] = OnSuccess(\n//   trace = "repl.MdocSession.MdocApp.myAppLogicNeedsEnv(deadlines.md:47)",\n//   first = OnSuccess(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:75)",\n//     first = Sync(\n//       trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:75)",\n//       eval = zio.ZIO$ServiceWithZIOPartiallyApplied$$$Lambda$13020/1487157448@65aa7a54\n//     ),\n//     successK = zio.ZIO$$$Lambda$13021/1100525026@14ce619f\n//   ),\n//   successK = <function1>\n// )\n')),(0,r.kt)("h2",{id:"setting-timeout-for-each-request"},"Setting timeout for each request"),(0,r.kt)("p",null,"As in the previous example, assuming there is a client in the environment, we can set the timeout\nfor each request like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'ServiceNameClient.withTimeoutMillis(3000).unary(Request())\n// res0: ZIO[ServiceNameClient, io.grpc.Status, Response] = OnSuccess(\n//   trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:75)",\n//   first = Sync(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameAccessors.unary(ZioTestservice.scala:75)",\n//     eval = zio.ZIO$ServiceWithZIOPartiallyApplied$$$Lambda$13020/1487157448@7116dff8\n//   ),\n//   successK = zio.ZIO$$$Lambda$13021/1100525026@14ce619f\n// )\n')),(0,r.kt)("p",null,"Clients provide (through the ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptionsMethods")," trait) a number of methods that make it possible\nto specify a deadline or a timeout for each request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"// Provide a new absolute deadline\ndef withDeadline(deadline: Deadline): Service\n\n// Sets a new timeout for this service\ndef withTimeout(duration: zio.duration.Duration): Service\n\n// Sets a new timeout in millis\ndef withTimeoutMillis(millis: Long): Service\n\n// Replace the call options with the provided call options\ndef withCallOptions(callOptions: CallOptions): Service\n\n// Effectfully update the CallOptions for this service\ndef mapCallOptionsM(f: CallOptions => zio.IO[Status, CallOptions]): Service\n")),(0,r.kt)("p",null,"If you are using a client instance, the above methods are available to provide you with a new\nclient that has a modified ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions")," effect. Making the copy of those clients is cheap and can\nbe safely done for each individual call:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'val clientScoped = ServiceNameClient.scoped(channel)\n// clientScoped: ZIO[Scope, Throwable, ServiceNameClient] = OnSuccess(\n//   trace = "myexample.testservice.ZioTestservice.ServiceNameClient.scoped(ZioTestservice.scala:124)",\n//   first = OnSuccess(\n//     trace = "myexample.testservice.ZioTestservice.ServiceNameClientWithResponseMetadata.scoped(ZioTestservice.scala:189)",\n//     first = OnSuccess(\n//       trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:11)",\n//       first = Sync(\n//         trace = "scalapb.zio_grpc.ZManagedChannel.apply(ZManagedChannel.scala:11)",\n//         eval = zio.ZIO$$$Lambda$13091/1316864982@5acabfaf\n//       ),\n//       successK = zio.ZIO$$$Lambda$13021/1100525026@14ce619f\n//     ),\n//     successK = zio.ZIO$$Lambda$13030/1297653547@10eb8c3e\n//   ),\n//   successK = zio.ZIO$$Lambda$13030/1297653547@6ebcd0ba\n// )\n\nval myAppLogic = ZIO.scoped {\n  clientScoped.flatMap { client =>\n    for {\n      res <- client\n               .withTimeoutMillis(3000).unary(Request())\n               .mapError(_.asRuntimeException)\n    } yield res\n  }\n}\n// myAppLogic: ZIO[Any, Throwable, Response] = OnSuccess(\n//   trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:64)",\n//   first = OnSuccess(\n//     trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:64)",\n//     first = Sync(\n//       trace = "repl.MdocSession.MdocApp.myAppLogic(deadlines.md:64)",\n//       eval = zio.Scope$ReleaseMap$$$Lambda$13114/1391463462@58f26fe3\n//     ),\n//     successK = zio.ZIO$$Lambda$13030/1297653547@1f5c821a\n//   ),\n//   successK = zio.ZIO$ScopedPartiallyApplied$$$Lambda$13116/80391539@539a67b3\n// )\n')))}m.isMDXComponent=!0}}]);