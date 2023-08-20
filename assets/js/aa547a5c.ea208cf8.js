"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[975],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=a,h=p["".concat(s,".").concat(m)]||p[m]||u[m]||r;return n?i.createElement(h,o(o({ref:t},d),{},{components:n})):i.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1286:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return u}});var i=n(3117),a=n(102),r=(n(7294),n(3905)),o=["components"],l={title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},s=void 0,c={unversionedId:"deadlines",id:"version-0.5.x/deadlines",title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",source:"@site/versioned_docs/version-0.5.x/deadlines.md",sourceDirName:".",slug:"/deadlines",permalink:"/zio-grpc/docs/0.5.x/deadlines",draft:!1,editUrl:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md",tags:[],version:"0.5.x",frontMatter:{title:"ZIO gRPC and Deadlines",description:"Setting deadlines with ZIO gRPC",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/deadlines.md"},sidebar:"version-0.5.x/someSidebar",previous:{title:"Decorating services",permalink:"/zio-grpc/docs/0.5.x/decorating"},next:{title:"Scala.js",permalink:"/zio-grpc/docs/0.5.x/scala.js"}},d={},u=[{value:"Setting timeout for all requests",id:"setting-timeout-for-all-requests",level:2},{value:"Setting timeout for each request",id:"setting-timeout-for-each-request",level:2}],p={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When you use a gRPC it is ",(0,r.kt)("a",{parentName:"p",href:"https://grpc.io/blog/deadlines/"},"a very important to set deadlines"),".\nIn gRPC, deadlines are absolute timestamps that tell our system when the response of an RPC call is\nno longer needed. The deadline is sent to the server, and the computation is automatically interrupted\nwhen the deadline is exceeded. The client call automatically ends with a ",(0,r.kt)("inlineCode",{parentName:"p"},"Status.DEADLINE_EXCEEDED")," error."),(0,r.kt)("p",null,"When you don't specify a deadline, client requests never timeout. All in-flight requests take\nresources on the server, and possibly upstream servers, which can ultimately hurt latency or crash\nthe entire process."),(0,r.kt)("p",null,"In ZIO gRPC you can easily set deadlines (absolute timestamps), or timeouts which are relative to\nthe time the outbound call is made."),(0,r.kt)("h2",{id:"setting-timeout-for-all-requests"},"Setting timeout for all requests"),(0,r.kt)("p",null,"To set the same timeout for all requests, it is possible to provide an effect that produces ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions"),"\nwhen constructing the client. This effect is invoked before each request, and can determine the deadline\nrelative to the system clock at the time the effect is executed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'import myexample.testservice.ZioTestservice.ServiceNameClient\nimport myexample.testservice.{Request, Response}\nimport scalapb.zio_grpc.{ZManagedChannel, SafeMetadata}\nimport io.grpc.ManagedChannelBuilder\nimport io.grpc.CallOptions\nimport java.util.concurrent.TimeUnit\nimport zio._\nimport zio.console._\n\nval channel = ZManagedChannel(\n  ManagedChannelBuilder\n    .forAddress("localhost", 8980)\n    .usePlaintext()\n)\n// channel: ZManagedChannel[Any] = zio.ZManaged$$anon$2@255dfc3d\n\n// create layer:\nval clientLayer = ServiceNameClient.live(\n  channel,\n  options=ZIO.effectTotal(\n    CallOptions.DEFAULT.withDeadlineAfter(3000, TimeUnit.MILLISECONDS)),\n  headers=SafeMetadata.make)\n// clientLayer: ZLayer[Any, Throwable, Has[ServiceNameClient.ZService[Any, Any]]] = Managed(\n//   self = zio.ZManaged$$anon$2@318ff46a\n// )\n\nval myAppLogicNeedsEnv = for {\n  // use layer through accessor methods:\n  res <- ServiceNameClient.unary(Request())\n  _ <- putStrLn(res.toString)\n} yield ()\n// myAppLogicNeedsEnv: ZIO[Has[ServiceNameClient.ZService[Any, Any]] with Any with Console, Object, Unit] = zio.ZIO$FlatMap@1f020e5d\n')),(0,r.kt)("h2",{id:"setting-timeout-for-each-request"},"Setting timeout for each request"),(0,r.kt)("p",null,"As in the previous example, assuming there is a client in the environment, we can set the timeout\nfor each request like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"ServiceNameClient.withTimeoutMillis(3000).unary(Request())\n// res0: ZIO[Has[ServiceNameClient.ZService[Any, Any]] with Any, io.grpc.Status, Response] = zio.ZIO$Read@32d8914a\n")),(0,r.kt)("p",null,"Clients provide (through the ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptionsMethods")," trait) a number of methods that make it possible\nto specify a deadline or a timeout for each request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"// Provide a new absolute deadline\ndef withDeadline(deadline: Deadline): Service\n\n// Sets a new timeout for this service\ndef withTimeout(duration: zio.duration.Duration): Service\n\n// Sets a new timeout in millis\ndef withTimeoutMillis(millis: Long): Service\n\n// Replace the call options with the provided call options\ndef withCallOptions(callOptions: CallOptions): Service\n\n// Effectfully update the CallOptions for this service\ndef mapCallOptionsM(f: CallOptions => zio.IO[Status, CallOptions]): Service\n")),(0,r.kt)("p",null,"If you are using a client instance, the above methods are available to provide you with a new\nclient that has a modified ",(0,r.kt)("inlineCode",{parentName:"p"},"CallOptions")," effect. Making the copy of those clients is cheap and can\nbe safely done for each individual call:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"val clientManaged = ServiceNameClient.managed(channel)\n// clientManaged: Managed[Throwable, ServiceNameClient.ZService[Any, Any]] = zio.ZManaged$$anon$2@168ab14e\n\nval myAppLogic = for {\n  res <- clientManaged.use(\n    client =>\n      client.withTimeoutMillis(3000).unary(Request())\n            .mapError(_.asException)\n  )\n} yield res\n// myAppLogic: ZIO[Any with Any, Throwable, Response] = zio.ZIO$FlatMap@2be1bc9f\n")))}m.isMDXComponent=!0}}]);