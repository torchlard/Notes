# JSP architecture
JSP container intercept request for JSP page
JSP processing
1. browser send HTTP request to web server
2. server recognize HTTP request for jsp, forward to JSP engine
3. load JSP page from disk, convert to servlet content
  - convert all to println(), Java code
4. compile servlet into executable class, forward original request to servlet engine
5. servlet engine load Servlet class, execute
  - output HTML format
  - pass to server inside HTTP response
6. browser handle dynamically generated HTML page inside response

# lifecycle
## compilation
jsp engine check if need compile page
if page never compiled / have modified, then recompile page
- parsing -> turn into servlet -> compile servlet

## initialization
jspinit()

## execution
_jspService(HttpServletRequest request, HttpServletResponse response)
- represent all interactions with requests until destroyed

## cleanup
destruction phase remove from use by container
jspDestroy() 


# element
scriptlet `<% code fragment %>` can contain any num of Java lang

jsp declaration
`<%! int i=0; %>`

jsp expression
`<p Today's Date: <%= (new java.util.Date()).toLocaleString() %></p>`

jsp comment
`<%-- comment is here --%>`

jsp directive: affect overall structure of servlet class
`<%@ page ...%>`: page dependent attributes
`<%@ include ... %>`: include file during translation phase
`<%@ taglib ... %>` declare tag library containing custom actions

jsp action
`<jsp:action_name attribute="value" />`
- jsp:include, jsp:useBean, jsp:setProperty, jsp:getProperty
- jsp:forward, jsp:plugin, jsp:eleemnt, jsp:body, jsp:text

jsp implicit object
- request (HttpServletRequest), response (HttpServletResponse)
- out (PrintWriter) , session (HttpSession)
- application (ServletContext), config (ServletConfig)
- pageContext (JspWriters), page
- Exception (Exception)

## logic
if..else

```jsp
<%! int day = 3; %>
<html><body>
  <% if(day==1 || day==7) { %> 
    <p> Today is weekend </p>
  <% } else { %>
    <p> today is not weekend </p>
  <% } %>
</body></html>

```

for loop
```jsp
<%for ( fontSize = 1; fontSize <= 3; fontSize++){ %>
    <font color = "green" size = "<%= fontSize %>">
      JSP Tutorial
</font><br />
<%}%>
```


# JSTL
JSP standard tag library

## core tag
out : display data
set : save data
remove : delete data
if, choose, when, otherwise
import
forEach
param, redirect, url

## formatted tag
formatNumber, parseNumber
formatDate, parseDate
bundle, setLocale, timeZone

## SQL tag
setDataSource, query, update
param, dateParam, transaction

## XML tag
## JSTL function
































