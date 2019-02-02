# Servlet
goal: receive HttpServletRequest
- doGet(), doPost() handle and response by HttpServletResponse
- init() -> ... -> destroy()
- web.xml config

servlet can set mutiple URL access, not thread safe

# CGI (common gateway interface)
CGI is a pattern/protocol, not language/technology
- not using any web framework, just use http protocol 
def: program that run on server to provide interface for client side HTML page

HTTP Request and header --treat as--> process environment variable
stdin: HTTP Request, stdout: HTTP response

- each request init 1 CGI program's system level process
- need repeat code handling network protocol and encoding -> time consuming
 
## FastCGI
FastCGI as improved CGI
fastcgi fork master, parse config file, init execution environment
-> fork multiple worker
when receive request, pass to worker, then accept next request

## CGI VS Servlet
1. servlet only need 1 system process and JVM, lower resource consumption
2. only need load 1 class for multiple same type of request
3. all class share web parsing and encoding code sharing
4. Servlet directly interact with web server, norm CGI program cannot
5. servlet can share data among program, database pool 

# JSP
JSP is kind of servlet
HttpServlet: compile -> deloy
JSP: deploy -> compile

JSP first time compile as HttpJspPAge
eg. login.jsp -> deploy to server -> login_jsp.class, login_jsp.java 

## 9 internal object
request, response
pageContext: get other object
session
application: app context
out: output stream
config
page: JSP itself (this)
exception

## Request method
setAttribute, getAttribute, getAttributeNames, removeAttribute
getParamter, getParameterValues
getProtocol, getQueryString

getCookies, getCharacterEncoding, getSession
getHeader, getHeaders, getHeaderNames
getInputStream, getMethod

getRequestURI, getRemoteAddr, getRemoteHost
getServerName
getServletPath, getServletPort





























