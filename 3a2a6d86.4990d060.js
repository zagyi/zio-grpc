(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{73:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return l}));var a=t(3),r=t(7),o=(t(0),t(87)),i={title:"Context and Dependencies",sidebar_label:"Context and Dependencies",custom_edit_url:"https://github.com/scalapb/zio-grpc/edit/master/docs/context.md"},s={unversionedId:"context",id:"context",isDocsHomePage:!1,title:"Context and Dependencies",description:"When implementing a server, ZIO gRPC allows you to specify that your service",source:"@site/../zio-grpc-docs/target/mdoc/context.md",slug:"/context",permalink:"/zio-grpc/docs/context",editUrl:"https://github.com/scalapb/zio-grpc/edit/master/docs/context.md",version:"current",sidebar_label:"Context and Dependencies",sidebar:"someSidebar",previous:{title:"Generated Code Reference",permalink:"/zio-grpc/docs/generated-code"},next:{title:"Decorating services",permalink:"/zio-grpc/docs/decorating"}},c=[{value:"Context transformations",id:"context-transformations",children:[{value:"Accessing metadata",id:"accessing-metadata",children:[]},{value:"Depending on a service",id:"depending-on-a-service",children:[]}]},{value:"Using a service as ZLayer",id:"using-a-service-as-zlayer",children:[]}],p={toc:c};function l(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"When implementing a server, ZIO gRPC allows you to specify that your service\ndepends on an environment of type ",Object(o.b)("inlineCode",{parentName:"p"},"R")," and a context of type ",Object(o.b)("inlineCode",{parentName:"p"},"Context"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"Context")," and ",Object(o.b)("inlineCode",{parentName:"p"},"R")," can be of any Scala type, however when they are not ",Object(o.b)("inlineCode",{parentName:"p"},"Any")," they have to be wrapped in an ",Object(o.b)("inlineCode",{parentName:"p"},"Has[]"),". This allows ZIO gRPC to combine two values (",Object(o.b)("inlineCode",{parentName:"p"},"Context with R"),") when providing the values at effect execution time."),Object(o.b)("p",null,"For example, we can define a service for which the effects depend on ",Object(o.b)("inlineCode",{parentName:"p"},"Console"),", and for each request we expect to get a context of type ",Object(o.b)("inlineCode",{parentName:"p"},"User"),". Note that ",Object(o.b)("inlineCode",{parentName:"p"},"Console")," is a type-alias to ",Object(o.b)("inlineCode",{parentName:"p"},"Has[Console.Service]")," so there is no need wrap it once more in an ",Object(o.b)("inlineCode",{parentName:"p"},"Has"),"."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},'import zio.{Has, ZIO}\nimport zio.console._\nimport scalapb.zio_grpc.RequestContext\nimport myexample.testservice.ZioTestservice.ZSimpleService\nimport myexample.testservice.{Request, Response}\nimport io.grpc.Status\n\ncase class User(name: String)\n\nobject MyService extends ZSimpleService[Console, Has[User]] {\n  def sayHello(req: Request): ZIO[Console with Has[User], Status, Response] =\n    for {\n      user <- ZIO.service[User]\n      _ <- putStrLn("I am here!")\n    } yield Response(s"Hello, ${user.name}")\n}\n')),Object(o.b)("p",null,"As you can see above, we can access both the ",Object(o.b)("inlineCode",{parentName:"p"},"User")," and the ",Object(o.b)("inlineCode",{parentName:"p"},"Console")," in our effects. If one of the methods does not need to access the dependencies or context, the returned type from the method can be cleaned up to reflect that certain things are not needed."),Object(o.b)("h2",{id:"context-transformations"},"Context transformations"),Object(o.b)("p",null,"In order to be able to bind our service to a gRPC server, we need to have the\nservice's Context type to be one of the supported types:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"Has[scalapb.zio_grpc.RequestContext]")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"Has[scalapb.zio_grpc.SafeMetadata]")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"Any"))),Object(o.b)("p",null,"The service ",Object(o.b)("inlineCode",{parentName:"p"},"MyService")," as defined above expects ",Object(o.b)("inlineCode",{parentName:"p"},"Has[User]")," as a context. In order to be able to bind it, we will transform it into a service that depends on a context of type ",Object(o.b)("inlineCode",{parentName:"p"},"Has[RequestContext]"),". To do this, we need to provide the function to produce a ",Object(o.b)("inlineCode",{parentName:"p"},"User")," out of a ",Object(o.b)("inlineCode",{parentName:"p"},"RequestContext"),". This way, when a request comes in, ZIO gRPC can take the ",Object(o.b)("inlineCode",{parentName:"p"},"RequestContext")," (which is request metadata such as headers and options), and use our function to construct a ",Object(o.b)("inlineCode",{parentName:"p"},"User")," and provide it into the environment of our original service."),Object(o.b)("p",null,"In many typical cases, we may need to retrieve the user from a database, and thus we are using an effectful function ",Object(o.b)("inlineCode",{parentName:"p"},"RequestContext => IO[Status, User]")," to find the user."),Object(o.b)("p",null,"For example, we can provide a function that returns an effect that always succeeds:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},'val fixedUserService =\n  MyService.transformContextM((rc: RequestContext) => ZIO.succeed(User("foo")))\n// fixedUserService: ZSimpleService[Console, Has[RequestContext]] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$4$$anon$5@48383d4e\n')),Object(o.b)("p",null,"and we got our service, which still depends on an environment of type ",Object(o.b)("inlineCode",{parentName:"p"},"Console"),", however the context is now ",Object(o.b)("inlineCode",{parentName:"p"},"Has[RequestContext]")," so it can be bound to a gRPC server."),Object(o.b)("h3",{id:"accessing-metadata"},"Accessing metadata"),Object(o.b)("p",null,"Here is how we would extract a user from a metadata header:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},'import zio.IO\nimport scalapb.zio_grpc.{ServiceList, ServerMain}\n\nval UserKey = io.grpc.Metadata.Key.of(\n  "user-key", io.grpc.Metadata.ASCII_STRING_MARSHALLER)\n// UserKey: io.grpc.Metadata.Key[String] = Key{name=\'user-key\'}\n\ndef findUser(rc: RequestContext): IO[Status, User] =\n  rc.metadata.get(UserKey).flatMap {\n    case Some(name) => IO.succeed(User(name))\n    case _          => IO.fail(Status.UNAUTHENTICATED.withDescription("No access!"))\n  }\n\nval rcService =\n  MyService.transformContextM(findUser)\n// rcService: ZSimpleService[Console, Has[RequestContext]] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$4$$anon$5@de3ae68\n\nobject MyServer extends ServerMain {\n  def services = ServiceList.add(rcService)\n}\n')),Object(o.b)("h3",{id:"depending-on-a-service"},"Depending on a service"),Object(o.b)("p",null,"A context transformation may introduce a dependency on another service. For example, you\nmay want to organize your code such that there is a ",Object(o.b)("inlineCode",{parentName:"p"},"UserDatabase")," service that provides\na ",Object(o.b)("inlineCode",{parentName:"p"},"fetchUser")," effect that retrieves users from a database. Here is how you can do this:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},"type UserDatabase = Has[UserDatabase.Service]\nobject UserDatabase {\n  trait Service {\n    def fetchUser(name: String): IO[Status, User]\n  }\n\n  // accessor\n  def fetchUser(name: String): ZIO[UserDatabase, Status, User] =\n    ZIO.accessM[UserDatabase](_.get.fetchUser(name))\n\n  val live = zio.ZLayer.succeed(\n    new Service {\n      def fetchUser(name: String): IO[Status, User] =\n        IO.succeed(User(name))\n    })\n}\n")),Object(o.b)("p",null,"Now,\nThe context transformation effect we apply may introduce an additional environmental dependency to our service. For example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},"import zio.clock._\nimport zio.duration._\n\nval myServiceAuthWithDatabase  =\n  MyService.transformContextM {\n    (rc: RequestContext) =>\n        rc.metadata.get(UserKey)\n        .someOrFail(Status.UNAUTHENTICATED)\n        .flatMap(UserDatabase.fetchUser)\n  }\n// myServiceAuthWithDatabase: ZSimpleService[Console with UserDatabase, Has[RequestContext]] = myexample.testservice.ZioTestservice$ZSimpleService$$anon$4$$anon$5@5a515c9f\n")),Object(o.b)("p",null,"And now our service not only depends on a ",Object(o.b)("inlineCode",{parentName:"p"},"Console"),", but also on a ",Object(o.b)("inlineCode",{parentName:"p"},"UserDatabase"),"."),Object(o.b)("h2",{id:"using-a-service-as-zlayer"},"Using a service as ZLayer"),Object(o.b)("p",null,"We can turn our service into a ZLayer:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},"val myServiceLive = myServiceAuthWithDatabase.toLayer\n// myServiceLive: zio.ZLayer[Console with UserDatabase, Nothing, Has[ZSimpleService[Any, Has[RequestContext]]]] = Managed(\n//   self = zio.ZManaged$$anon$2@6f8b0ab\n// )\n")),Object(o.b)("p",null,"notice how the dependencies moved to the input side of the ",Object(o.b)("inlineCode",{parentName:"p"},"Layer")," and the resulting layer is of\ntype ",Object(o.b)("inlineCode",{parentName:"p"},"ZSimpleService[Any, Has[RequestContext]]]"),", which means no environment is expected, and it assumes\na ",Object(o.b)("inlineCode",{parentName:"p"},"Has[RequestContext]")," context. To use this layer in an app, we can wire it like so:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},"import scalapb.zio_grpc.ServerLayer\n\nval serverLayer =\n    ServerLayer.fromServiceLayer(\n        io.grpc.ServerBuilder.forPort(9000)\n    )(myServiceLive)\n// serverLayer: zio.ZLayer[Console with UserDatabase, Throwable, Has[scalapb.zio_grpc.Server.Service]] = Fold(\n//   self = Managed(self = zio.ZManaged$$anon$2@6f8b0ab),\n//   failure = Managed(self = zio.ZManaged$$anon$2@1161567),\n//   success = Managed(self = zio.ZManaged$$anon$2@7523c5e0)\n// )\n\nval ourApp = (UserDatabase.live ++ Console.any) >>>\n    serverLayer\n// ourApp: zio.ZLayer[Any with Console, Throwable, Has[scalapb.zio_grpc.Server.Service]] = Fold(\n//   self = ZipWithPar(\n//     self = Managed(self = zio.ZManaged$$anon$2@2cbc071c),\n//     that = Managed(self = zio.ZManaged$$anon$2@3c6f52f7),\n//     f = zio.ZLayer$$Lambda$12943/1657521410@3984c4b4\n//   ),\n//   failure = Managed(self = zio.ZManaged$$anon$2@7095e964),\n//   success = Fold(\n//     self = Managed(self = zio.ZManaged$$anon$2@6f8b0ab),\n//     failure = Managed(self = zio.ZManaged$$anon$2@1161567),\n//     success = Managed(self = zio.ZManaged$$anon$2@7523c5e0)\n//   )\n// )\n\nobject LayeredApp extends zio.App {\n    def run(args: List[String]) = ourApp.build.useForever.exitCode\n}\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"serverLayer")," wraps around our service layer to produce a server. Then, ",Object(o.b)("inlineCode",{parentName:"p"},"ourApp")," layer is constructed such that it takes ",Object(o.b)("inlineCode",{parentName:"p"},"UserDatabase.live")," in conjuction to a passthrough layer for ",Object(o.b)("inlineCode",{parentName:"p"},"Console")," to satisfy the two input requirements of ",Object(o.b)("inlineCode",{parentName:"p"},"serverLayer"),". The outcome, ",Object(o.b)("inlineCode",{parentName:"p"},"ourApp"),", is a ",Object(o.b)("inlineCode",{parentName:"p"},"ZLayer")," that can produce a ",Object(o.b)("inlineCode",{parentName:"p"},"Server")," from a ",Object(o.b)("inlineCode",{parentName:"p"},"Console"),". In the ",Object(o.b)("inlineCode",{parentName:"p"},"run")," method we build the layer and run it. Note that we are directly using a ",Object(o.b)("inlineCode",{parentName:"p"},"zio.App")," rather than ",Object(o.b)("inlineCode",{parentName:"p"},"ServerMain")," which does\nnot support this use case yet."))}l.isMDXComponent=!0},87:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=r.a.createContext({}),l=function(e){var n=r.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=l(e.components);return r.a.createElement(p.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},u=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(t),u=a,m=d["".concat(i,".").concat(u)]||d[u]||b[u]||o;return t?r.a.createElement(m,s(s({ref:n},p),{},{components:t})):r.a.createElement(m,s({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=t[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);