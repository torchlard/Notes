# architecture
```
master -> worker <-> request
       -> worker <-> request
```
## master process
validate nginx.conf, manage worker process

## worker process
each worker manage a thread, avoid switching thread
manage connection and request
worker process ~ CPU number by default

## hot deploy
nginx -s reload
nginx -t: check config

# main components
## Ngnix
binary executable, execute file from modules
## Nginx.conf
config file
## access.log
record every HTTP request message
## error.log
for error debugging

# mechanism
use Linux epoll model
event driven, check if event if ready; if OK, put in epoll queue

# introduction
high performance HTTP and reverse proxy server
IMAP/POP3/SMTP server

## relation with apache, tomcat
- Tomcat is more like "Application server"
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

## nginx work with tomcat
1. separate dynamic and static resource
Tomcat: dynamic page
Nginx: static resource like CSS, JavaScript, video, image
- lower pressure of Tomcat
2. load balance
when we horizontally scale Tomcat, Nginx can load balance to Tomcat instance

## design
1. core module
HTTP, Event, Mail
2. fundamental
HTTP Access, HTTP FastCGI, HTTP proxy, HTTP rewrite
3. 3rd party
HTTP upstream request hash, notice, HTTP Access key

very modular design

# nginx config
config location: /etc/nginx/conf.d/xx.conf

# high availability
Keepalived: virtual ip map to 1 nginx server

# operation
## reverse proxy
`root` -> `proxy_pass`
request -> Nginx -> Tomcat
aloow custom HTTP header
```
server {
  listen 80;
  server_name localhost;
  client_max_body_size 1024M;

  location / {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host:$server_port;
  }
}
```
request: localhost -> localhost:8080

## load balance (upstream)
1. use `upstream` define group of Tomcat, specify strategy (ip_hash, fair, least connection)
2. proxy_pass -> upstream assigned value

## strategy
RR: round robin assign one by one according to request time
weighted: assign request probability
ip_hash: 1 client only access 1 server, request assigned by ip's hash value
fair: short response time higher priority
url_hash: assign by hash of url, every url map to same server

### RR
```
// load balance core code
// 9 times to 8080, 1 time to 8081
upstream test {
  // ip_hash;
  fair;
  server localhost:8080 weight=9;
  server localhost:8081 weight=1;
}

server {
  listeen 81;
  server_name localhost;
  client_max_body_size 1024M;

  location / {
    proxy_pass http://test;
    proxy_set_header Host $host:$server_port;
  }
}
```
if nginx found that localhost:8081 is not accessible, will only direct to localhost:8080

## url_hash
```
upstream backend {
  hash $request_url;
  hash_method crc32;
  server localhost:8080;
  server localhost:8081;
}
```

## separate dynamic static
```
upstream test {
  server localhost:8080;
  server localhost:8081;
}

server {
  listen 80;
  server_name localhost;
}

location / {
  root e:wwwroot;
  index index.html;
}

location ~ .(gif|jpg|jpeg|css|js)$ {
  root e:wwwroot;
}

location ~ .(jsp|do)$ {
  proxy_pass http://test;
}
```

## proxy
```
resolver 114.114.114.114 8.8.8.8;
server {
  resolver_timeout 5s;
  listen 81;

  access_log e:wwwrootproxy.access.log;
  error_log e:wwwrootproxy.error.log;

  location / {
    proxy_pass http://$host$request_url;
  }
}
```









