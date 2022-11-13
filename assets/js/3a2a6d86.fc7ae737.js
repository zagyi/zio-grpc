"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[292],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,v=u["".concat(c,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(v,i(i({ref:t},l),{},{components:n})):r.createElement(v,i({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3192:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={title:"Context and Dependencies",sidebar_label:"Context and Dependencies",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/context.md"},c=void 0,p={unversionedId:"context",id:"context",title:"Context and Dependencies",description:"When implementing a server, ZIO gRPC allows you to specify that your service",source:"@site/../zio-grpc-docs/target/mdoc/context.md",sourceDirName:".",slug:"/context",permalink:"/zio-grpc/docs/next/context",draft:!1,editUrl:"https://github.com/scalapb/zio-grpc/edit/master/docs/context.md",tags:[],version:"current",frontMatter:{title:"Context and Dependencies",sidebar_label:"Context and Dependencies",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/context.md"},sidebar:"someSidebar",previous:{title:"Generated code",permalink:"/zio-grpc/docs/next/generated-code"},next:{title:"Decorating services",permalink:"/zio-grpc/docs/next/decorating"}},l={},d=[{value:"Context transformations",id:"context-transformations",level:2},{value:"Accessing metadata",id:"accessing-metadata",level:3},{value:"Depending on a service",id:"depending-on-a-service",level:3},{value:"Using a service as ZLayer",id:"using-a-service-as-zlayer",level:2}],u={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"When implementing a server, ZIO gRPC allows you to specify that your service\ndepends on an environment of type ",(0,o.kt)("inlineCode",{parentName:"p"},"R")," and a context of type ",(0,o.kt)("inlineCode",{parentName:"p"},"Context"),"."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Context")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"R")," can be of any Scala type. This allows ZIO gRPC to combine two values (",(0,o.kt)("inlineCode",{parentName:"p"},"Context with R"),") when providing the values at effect execution time."),(0,o.kt)("p",null,"For example, we can define a service for which the effects depend on ",(0,o.kt)("inlineCode",{parentName:"p"},"Console"),", and for each request we expect to get a context of type ",(0,o.kt)("inlineCode",{parentName:"p"},"User"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.ZIO\nimport zio.Console\nimport zio.Console.printLine\nimport scalapb.zio_grpc.RequestContext\nimport myexample.testservice.ZioTestservice.ZSimpleService\nimport myexample.testservice.{Request, Response}\nimport io.grpc.Status\n\ncase class User(name: String)\n\nobject MyService extends ZSimpleService[Any, User] {\n  def sayHello(req: Request): ZIO[User, Status, Response] =\n    for {\n      user <- ZIO.service[User]\n      _ <- printLine("I am here!").orDie\n    } yield Response(s"Hello, ${user.name}")\n}\n')),(0,o.kt)("p",null,"As you can see above, we can access both the ",(0,o.kt)("inlineCode",{parentName:"p"},"User")," and the ",(0,o.kt)("inlineCode",{parentName:"p"},"Console")," in our effects. If one of the methods does not need to access the dependencies or context, the returned type from the method can be cleaned up to reflect that certain things are not needed."),(0,o.kt)("h2",{id:"context-transformations"},"Context transformations"),(0,o.kt)("p",null,"In order to be able to bind our service to a gRPC server, we need to have the\nservice's Context type to be one of the supported types:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"scalapb.zio_grpc.RequestContext")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"scalapb.zio_grpc.SafeMetadata")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Any"))),(0,o.kt)("p",null,"The service ",(0,o.kt)("inlineCode",{parentName:"p"},"MyService")," as defined above expects ",(0,o.kt)("inlineCode",{parentName:"p"},"User")," as a context. In order to be able to bind it, we will transform it into a service that depends on a context of type ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext"),". To do this, we need to provide the function to produce a ",(0,o.kt)("inlineCode",{parentName:"p"},"User")," out of a ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext"),". This way, when a request comes in, ZIO gRPC can take the ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext")," (which is request metadata such as headers and options), and use our function to construct a ",(0,o.kt)("inlineCode",{parentName:"p"},"User")," and provide it into the environment of our original service."),(0,o.kt)("p",null,"In many typical cases, we may need to retrieve the user from a database, and thus we are using an effectful function ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext => IO[Status, User]")," to find the user."),(0,o.kt)("p",null,"For example, we can provide a function that returns an effect that always succeeds:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'val fixedUserService =\n  MyService.transformContextZIO((rc: RequestContext) => ZIO.succeed(User("foo")))\n// fixedUserService: ZSimpleService[Any, RequestContext] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$8$$anon$9@15753f26\n')),(0,o.kt)("p",null,"and we got our service with context of type ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext")," so it can be bound to a gRPC server."),(0,o.kt)("h3",{id:"accessing-metadata"},"Accessing metadata"),(0,o.kt)("p",null,"Here is how we would extract a user from a metadata header:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.IO\nimport scalapb.zio_grpc.{ServiceList, ServerMain}\n\nval UserKey = io.grpc.Metadata.Key.of(\n  "user-key", io.grpc.Metadata.ASCII_STRING_MARSHALLER)\n// UserKey: io.grpc.Metadata.Key[String] = Key{name=\'user-key\'}\n\ndef findUser(rc: RequestContext): IO[Status, User] =\n  rc.metadata.get(UserKey).flatMap {\n    case Some(name) => ZIO.succeed(User(name))\n    case _          => ZIO.fail(Status.UNAUTHENTICATED.withDescription("No access!"))\n  }\n\nval rcService =\n  MyService.transformContextZIO(findUser)\n// rcService: ZSimpleService[Any, RequestContext] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$8$$anon$9@66efc853\n\nobject MyServer extends ServerMain {\n  def services = ServiceList.add(rcService)\n}\n')),(0,o.kt)("h3",{id:"depending-on-a-service"},"Depending on a service"),(0,o.kt)("p",null,"A context transformation may introduce a dependency on another service. For example, you\nmay want to organize your code such that there is a ",(0,o.kt)("inlineCode",{parentName:"p"},"UserDatabase")," service that provides\na ",(0,o.kt)("inlineCode",{parentName:"p"},"fetchUser")," effect that retrieves users from a database. Here is how you can do this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"object UserDatabase {\n  trait Service {\n    def fetchUser(name: String): IO[Status, User]\n  }\n\n  // accessor\n  def fetchUser(name: String): ZIO[UserDatabase.Service, Status, User] =\n    ZIO.environmentWithZIO[UserDatabase.Service](_.get.fetchUser(name))\n\n  val live = zio.ZLayer.succeed(\n    new Service {\n      def fetchUser(name: String): IO[Status, User] =\n        ZIO.succeed(User(name))\n    })\n}\n")),(0,o.kt)("p",null,"Now,\nThe context transformation effect we apply may introduce an additional environmental dependency to our service. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"import zio.Clock._\nimport zio.Duration._\n\nval myServiceAuthWithDatabase  =\n  MyService.transformContextZIO {\n    (rc: RequestContext) =>\n        rc.metadata.get(UserKey)\n        .someOrFail(Status.UNAUTHENTICATED)\n        .flatMap(UserDatabase.fetchUser)\n  }\n// myServiceAuthWithDatabase: ZSimpleService[UserDatabase.Service, RequestContext] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$8$$anon$9@5de15cf9\n")),(0,o.kt)("p",null,"And now our service not only depends on a ",(0,o.kt)("inlineCode",{parentName:"p"},"Console"),", but also on a ",(0,o.kt)("inlineCode",{parentName:"p"},"UserDatabase"),"."),(0,o.kt)("h2",{id:"using-a-service-as-zlayer"},"Using a service as ZLayer"),(0,o.kt)("p",null,"We can turn our service into a ZLayer:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"val myServiceLive = myServiceAuthWithDatabase.toLayer\n// myServiceLive: zio.ZLayer[UserDatabase.Service, Nothing, ZSimpleService[Any, RequestContext]] = Suspend(\n//   self = zio.ZLayer$$$Lambda$12897/644525152@4dcf31\n// )\n")),(0,o.kt)("p",null,"notice how the dependencies moved to the input side of the ",(0,o.kt)("inlineCode",{parentName:"p"},"Layer")," and the resulting layer is of\ntype ",(0,o.kt)("inlineCode",{parentName:"p"},"ZSimpleService[Any, RequestContext]]"),", which means no environment is expected, and it assumes\na ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestContext")," context. To use this layer in an app, we can wire it like so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"import scalapb.zio_grpc.ServerLayer\nimport zio.ZLayer\n\nval serverLayer =\n    ServerLayer.fromServiceLayer(\n        io.grpc.ServerBuilder.forPort(9000)\n    )(myServiceLive)\n// serverLayer: ZLayer[UserDatabase.Service, Throwable, scalapb.zio_grpc.Server.Service] = Suspend(\n//   self = zio.ZLayer$$$Lambda$12897/644525152@755cfc0c\n// )\n\nval ourApp = UserDatabase.live >>> serverLayer\n// ourApp: ZLayer[Any, Throwable, scalapb.zio_grpc.Server.Service] = Suspend(\n//   self = zio.ZLayer$$$Lambda$12897/644525152@e4f4855\n// )\n\nobject LayeredApp extends zio.ZIOAppDefault {\n    def run = (ourApp.build *> ZIO.never).exitCode\n}\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"serverLayer")," wraps around our service layer to produce a server. Then, ",(0,o.kt)("inlineCode",{parentName:"p"},"ourApp")," layer is constructed such that it takes ",(0,o.kt)("inlineCode",{parentName:"p"},"UserDatabase.live")," in conjuction to a passthrough layer for ",(0,o.kt)("inlineCode",{parentName:"p"},"Console")," to satisfy the two input requirements of ",(0,o.kt)("inlineCode",{parentName:"p"},"serverLayer"),". The outcome, ",(0,o.kt)("inlineCode",{parentName:"p"},"ourApp"),", is a ",(0,o.kt)("inlineCode",{parentName:"p"},"ZLayer")," that can produce a ",(0,o.kt)("inlineCode",{parentName:"p"},"Server")," from a ",(0,o.kt)("inlineCode",{parentName:"p"},"Console"),". In the ",(0,o.kt)("inlineCode",{parentName:"p"},"run")," method we build the layer and run it. Note that we are directly using a ",(0,o.kt)("inlineCode",{parentName:"p"},"zio.ZioAppDefault")," rather than ",(0,o.kt)("inlineCode",{parentName:"p"},"ServerMain")," which does\nnot support this use case yet."))}m.isMDXComponent=!0}}]);