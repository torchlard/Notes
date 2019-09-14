# introduction
JSP mix business, db, page design, control flow code in jsp file
too difficult to maintain

use MVC architecture to separate layers
- request handler map to standard URI
- response handler transfer control to another resource which completes the response

work well with REST, SOAP, AJAX

## servlets, filters, web containers
Java servlet try cast HTTP into OOP form
strut use ServletFilter to make things work
- filter compose set of component to process request/response

## session
object that implements `javax.servlet.http.HttpSession`
servlet container use cookies/URL rewriting to ensure next request from same sue include session id for session
- state info stored in session attributes (in JSP, called session scope beans)
- session have configurable timeout

## application
each application run in its own namespace
- they can developed and deployed separately
- web application can be aseembled into application archive / WAR file

## JSP, JSP tag library, JavaServer Faces
support JSP, velocity, freemarker

## business logic framework
Spring
Google Guice
Common Chain of Responsibility

## Data Access Framework
Apache Cayenne
Enterprise Java Beans
Hibernates
myBatis










