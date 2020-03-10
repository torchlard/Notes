# history
## HTTP/0.9 [1991]
applicaiton layer, default port 80
client only GET, server can only return HTML

## HTTP/1.0 [1996]
server can sent any content, including image, video, binary
add POST, HEAD methods
add status code, encoding, authentication, cache, multi-part type

### Content-Type / MIME
mechanism to manage different file type
`text/plain, text/html, text/css`
`image/jpeg, image/png, image/svg+xml`
`audio/mp4, video/mp4`
`application/javascript, application/pdf, application/zip`

- use multipart to contain data
eg. multipart/form-data, multipart/byteranges, 
- custom type
`application/vnd.debian.binary-package`

Client use `Accept: */*` to indicate what data type to accept
Server use `Content-Type` indicate what type sent

### Content encoding
eg. Content-Encoding: gzip, compress, deflate
show compression method
- client use `Accept-Encoding: gzip, deflate` to indicate accept what encoding

### Drawback
each TCP can only make 1 request, immediate close after sending data
=> use non-standard `Connection: keep-alive` to keep TCP connection

## HTTP/1.1 [1997]
add PUT, PATCH, HEAD, OPTIONS, DELETE
`Host: www.example.com`

### persistent connection
all connections default persistent connection, no need `Connection: keep-alive`
use `Connection: close` to close connection
at most 6 persistent connection for same namespace

### pipelining
client sent multiple request at same time, no need wait response

### Content-Length
distinguish data correspond to which response:
  `Content-Length: 3495`: tell browser response length = 3945 bytes
  data after 3945 bytes belong to next response

### chunked transfer
not efficient if server sent after gathering all data
so use stream mode, `Transfer-Encoding: chunked` 
=> response has undetermined number of chunks
ex.
```
3
con

8
sequence
```

## HTTP/2
HTTP/1.1 header is text, body is text/binary
HTTP/2 header & body are bindary -> header frame, body frame

can define additional frame (has ~10 frames) for advanced application
### multiplexing
in same TCP connection, can send/receive multiple request/response, no need to follow order
=> avoid congestion
=> bidirectional, realtime communication

### data stream
stream = all data packet of a request/response
each data stream has unique identifier
from client: odd ID; from server: even ID

when data stream is sending, client/server can send RST_STREAM to stop stream, 
but TCP connection is still maintained

client can specify priority of stream, higher for earlier response

### header compression
by gzip/compress, client and server maintain header information table
=> table indexed, packet only send index

### server push
allow server to push data to client without client request

# Method
GET: search, POST: add, PUT: change, DELETE: delete

## GET
url length restriction
no side effect
idempotent: return same result for same url request
## POST
may change resource in server
theoretically no size restriction

GET and POST are the same, except GET in url, POST in body

# Content Negotiation
decide to show eng/chi version page
things to consider:
accept, accept-charset, accept-encoding, accept-language, content-language

# Forward VS Redirect
Forward: server action
Redirect: client action

forward: 
- use `RequestDispatcher`'s `forward(req, res)` implement
- eg. `request.getRequestDispatcher("login_success.jsp").forward(request, response)`

redirect: 
- use server's status code
- if server return 301/302, then browser will go to new website request resource again

address bar: 
- server directly access target address URL, return response to browser
- browser don't know where data come from
- redirect tell browser to request new address again, address bar show new address

data sharing:
- forward can share data in request, redirect cannot

usage:
- forward: when client login, navigate to corresponding module by role
- redirect: used when user cancel login, return to main page / jump to other website


# header
## X-Content-Type-Options
`X-Content-Type-Options: nosniff`

response header used by server
indicate MIME types advertised in Content-Type headers should not change
- prevent browser sniff MIME type


# referer
tell server where user from

not sent: 
  - user type url in browser
  - choose bookmark

sent:
  - click link on webpage
  - submit form
  - static resource

## referrer policy
no-referrer
no-referrer-when-downgrade: https link to http website
same-origin
origin
















