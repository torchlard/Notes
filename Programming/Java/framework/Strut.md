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


# Action class
as controller in MVC
respond to user action, execute business logic, return result tell Struts what view to render

ActionSupport: default implementation for most common actions (eg. execute, input)
```jsp
<s:form action="hello">
  <s:textfield name="username" label="Your name"/>
  <s:submit value="Submit"/>
</s:form>  
```
when user click submit, execute hello.action, form field value posted to action class

# Struts tag
framework provide tag library decoupled from view technology
most tag supported in all template languages (eg. JSP tag, velocity, Freemarker tag)

## generic tags
control tag, eg. if,else,iterator
data tag, eg. bean, push, i18n

## UI tag
template: bit of code written in FreeMarker that can be rendered by certain tags
theme: collection of templates packaged together to provide common functionality

form tag, eg.form,textfield,select
non-form tag, eg. a, div, tabbedPanel














