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
  - each worker has own connection pool (max=worker_connections)

## hot deploy
nginx -s reload
nginx -t: check config


# concept
## connection
abstraction of TCP, include socket, read/write event

## lifecycle
1. parse config file, get ip,port
2. in master process, set socket(bind ip,pot -> listen)
3. fork multiple child processes, let processes compete for accept new connection
4. client connect to nginx, one of child process accept success, get connected socket
5. construct strcut ngx_connection_t 
6. set RW event function
7. close connection

use linked list free_connnections keep all idle ngx_connection_t
- each time get connection, get one from linked list

## mechanism
use Linux epoll model
event driven, check if event is ready; if OK, put in epoll queue


# files
## Nginx
binary executable, execute file from modules
## Nginx.conf
config file
## access.log
record every HTTP request message
## error.log
for error debugging


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


## nginx work with tomcat
1. separate dynamic and static resource
Tomcat: dynamic page
Nginx: static resource like CSS, JavaScript, video, image
  - lower pressure of Tomcat
2. load balance
when we horizontally scale Tomcat, Nginx can load balance to Tomcat instance

# nginx design
1. core module
HTTP, Event, Mail
2. fundamental
HTTP Access, HTTP FastCGI, HTTP proxy, HTTP rewrite
3. 3rd party
HTTP upstream request hash, notice, HTTP Access key

very modular design

## module types
### event module
event handling framework
eg. ngx_events_module, ngx_event_core_module, ngx_epoll_module

### phase handler
eg. ngx_http_static_module

### (output) filter
process output content, eg. modify images, add footbar

### upstream
reverse proxy, redirect request
- to include machines's network path that can do load balance

### load-balancer
implement specific algorithm, choose one among all servers


# nginx config
config location: /etc/nginx/conf.d/xx.conf

# high availability
Keepalived: virtual ip map to 1 nginx server

# operation
## reverse proxy
`root` -> `proxy_pass`
request -> Nginx -> Tomcat
allow custom HTTP header

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


# request handling process
1. init HTTP Request object
2. process header
3. process body
4. manager related header (URL/location)
5. call each phase handler

## phase handler
tasks
1. get location config
2. produce response
3. send response header
4. send response body

NGX_HTTP_:
- post read
- server rewrite
- find config
- rewrite (location request)
- post rewrite
- preaccess (access privilege validation prepare)
- access
- post access
- try files
- content
- log

in content phase, dispatch request to an appropriate content handler
if specified content handler, run 
eg. perl, flv, proxy_pass, mp4 ...


## location
==if no content handler, then try==

random_index on:
random send a file

index:
send file specified by index

autodindex on:
send file list under that path

gzip_static on:
send .gz file if exists

if request static file, then send file content

## filter
after content generation phase, send to filter module

1. server-side includes
2. XSLT filtering
3. image scaling
4. gzip compression


# settings
## sendfile
sendfile = system call after linux 2.0
more performance than read,write 


# command scope
## main
config irrelevant to business logic
eg. worker process, user identity

## http
http related config

## server
support multiple virtual host, each host one config

## location
in http, config for certain URL

## main
use SMTP/IMAP/POP3 proxy, share some config


# cache
proxy_cache_path:
when enable cache, server response save to disk, won't direct to backend

levels: setup 2-level directory under /path/to/cche
keys_zone: setup shred memory zone for storing cache keys and medatadata
  - metadata: eg. usage times
  - 1M zone : can store data about 8000 keys

max_size: upper limit of cache size
inactive: how long item can remain in cache without being accessed  
  - default 10m
  - expired content deleted only when not accessed by inactive time

proxy_cache [zone name]
`proxy_cache_valid 200 304 2m` 2m timeout for request state 200 and 304

## header
X-Accel-Expires: how long to store fastcgi / proxy cache 
Expires: temp save page to client browser
  - -1 = always expire

if source website tell nginx Expires/Cache-Control setting max-age
- want to let nginx's cache time as standard, so ignore source website header
- control by proxy_cache_valid

`add_header X-Cache-Status $upstream_cache_status`
response caching status, know whether hit cache

`proxy_ssl_server_name on;`
pass hostname to backend server, let remote server get hsot in TLS status

## dynamic add cors header
proxy_hide_header Access-Control-Allow-Origin;  
add_header 'Access-Control-Allow-Origin' '*' always;


# rewrite
rewrite <rule> <redirect path> <rewrite type>

type
  - last: finish rewrite, URL unchange
  - break: after matching this rule, stop matching later rules, URL unchange
  - redirect: return 302 redirect, browser show redirect url
  - permanent: return 301, browser show redirect url

`rewrite /last.html /index.html last` 

```
rewrite ^(/download/.*)/media/(\w+)\.?.*$ $1/mp3/$2.mp3 last;
rewrite ^(/download/.*)/audio/(\w+)\.?.*$ $1/mp3/$2.ra  last;
```
match url that begins with string `/download`, then include `/media` or `/audio` later in path
replace those elements with /mp3/ and adds appropriate file extensions .mp3 or .ra
$1, $2 capture path elements that aren't changing

eg. /download/cdn-west/media/file1 -> /download/cdn-west/mp3/file1.mp3

# CDN VS nginx
CDN is less important than setting server side header caching, 
but CDN can provide significant performance gains 

CDN in some rare case can slower than server if over optimize, 
employ too much parallelization of resources (eg. multi subdomains)
=> possible end up slowing down user experience

















