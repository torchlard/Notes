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
as servlet container, 2 main component
## connector
link user request to container
- build request, response object for each HTTP request
- then dispatch to container

## container
receive dispatch, run servlet service
- others like authentification, session update


# Demo
## servlet processor
URLClassLoader: url array, point to locaiton of servlet classes
- end with "/" => directory
- else => jar
repository: location to check servlet class









