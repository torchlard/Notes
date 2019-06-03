# HTTP Request
header1 \r\n
header2 \r\n
...

entity


# servlet
implement javax.servlet.ServletRequest's Request object
Request(headers, cookies, query, uri ...)


## servlet interface method
init(config)
service(request, response)
destroy()
getServletConfig()
getServletInfo()

## process
1. init() only once
2. for each request, create 1 Request, 1 Response
3. pass Request, Response object as parameter
4. If request static resource, then call StaticResourceProcessor's process()
5. if req servlet, call service()
6. destroy() only when all service() finished OR server closed


# catalina
as servlet container, has 2 main components
## connector
link user request to container
- build request, response object for each HTTP request
- then dispatch to container
## container
receive dispatch, run servlet service
- others like authentification, session update


# Connector
connector just input param that servlet needs, to save time
- use SocketInputStream to read byte stream

1. wait http request
2. create HttpProcessor object for each request
3. call process() in HttpProcessor

for process():
1. create HttpReqeust, HttpRequest object
2. handle request line, header; fill in HttpRequest
3. forward to ServletProcessor / StaticResourceProcessor's process()


## StringManager
tomcat put error in properties file, each package has its own .properties


# Connector
independent module that insert into servlet container
implementations:
- coyote, mod_jk, mod_jk2, mod_webapp

1. implement org.apache.catalina.Connector
2. implement org.apache.catalina.Request object
3. implement org.apache.catalina.Response object

## process
1. wait http
2. invoke() in org.apache.catalina.Container, pass req,res to container

## optimization
connection pool, character array instead of String

## connector interface
getContainer
setContainer: link connector and container
createRequest
createResponse

implements Runnable, org.apache.catalina.Lifecycle
- after create HttpConnector instance, run initialize(), start()

## ServerSocket
initialize() -> open() => return ServerSocket
assign value to serverSocket

## HttpProcessor object pool
connector can handle multiple http request
- minProcessors, maxProcessors

async, handle many http request same time: assign





















