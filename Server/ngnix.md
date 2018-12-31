# introduction
high performance HTTP and reverse proxy server
IMAP/POP3/SMTP server

## relation with apache, tomcat
Tomcat can be extension of apache
apache need tomcat to run java
both apache and ngnix are http server

Tomcat can run alone, but performance is not good
so use eg. ngnix for reverse proxy

## jetty VS tomcat
Java http server, Java servlet container
implement part of JEE standard (servlet & jsp)

Jetty is simpler than Tomcat, higher extensibility
- based on Handler
- default NIO

Tomcat built based on container
- default BIO
- support is better and more complete standard support

## design
1. core module
HTTP, Event, Mail
2. fundamental
HTTP Access, HTTP FastCGI, HTTP proxy, HTTP rewrite
3. 3rd party
HTTP upstream request hash, notice, HTTP Access key

very modular design







