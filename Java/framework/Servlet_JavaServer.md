# introduction
## purpose of web application
1. orgranization
.class: `WEB-INF/classes`
jar: `SEB-INF/lib`
web.xml: `WEB-INF`
jsp: top level directory / subdirectory other than WEB-INF/META-INF
tag library descriptor: `WEB-INF`
tag files: `WEB-INF/tags`

2. portability
any compliant server can deploy and run
3. separation
different web application deployed on same server don't interfere with each otehr

## JSP
access via `http://host/<webAppPrefix>/<subdirectory>/<filename>.jsp`
default file `index.jsp` access without specify entry in web.xml

## servlet, beans, helper class
access servlet
1. specify `servlet-mapping` in web.xml
2. `http://host/<webAppPrefix>/servlet/<packageName>.<ServletName>`
  - not recommand, security problem, type too long, maintenance headache

## jar
shared across multiple web applications
in tomcat, place at `<tomcat_dir>/shared/lib`

## deployment descriptor
deployment descriptor file `web.xml`
in tomcat, at `<tomcat_dir>/conf/web.xml`

## tag files
include tag files in JAR file
not auto generate TLD, must declare tag file and itspath within .tld file

## WAR manifest file
when create WAR file, MANIFEST.MF placed in `META-INF`


## register web application with server
although web application completely portable, registration process is server specific
- location of top-level directoy placed different position with different server

use separate deployment directory to deploy by one of strategy

### register with tomcat
hot-deployment: deploy web app by copying drectory strucure into some server directory
extra control: `tomcat_dir/conf/server.xml`

1. create web app directory structure with top-level directory
2. declare servlet and map in web.xml
3. copy myWebApp to tomcat_dir/webapps
4. add context entry to tomcat_dir/conf/server.xml
  - path: URL prefix, docBse: base installation directory
5. access JSP page and servlet


# HttpServletRequest
every time client request page, JSP create new obj to handle it

# Filter
authentication
data compression
encryption
filters that trigger resource access events
image conversion filters
logging and auditing filters
mime-type chain filters
tokenizing filters
XSL/T filters 

# Logging
tomcat has own implementation of several key elements java.util.logging


# session
a way to identify user across more than 1 page request / visit to website
- store info about user

HttpSession interface
- can view and manipulate information about session
- bind objects to session, allow user info persist across multiple user connection

id: unique identifier for the session
lastAccessTime: last time client sent reqeust with session 

# implicit object
## application
application object, when web server starts, auto create it
- exist until web server close
- singleton, shared















