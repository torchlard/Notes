# java9 jdk.incubator.http
## HttpClient http
send request, get response
HttpClient created through builder
once built, immutable, send mutable request

BodyHandler must supplied for each HttpRequest sent

## Request
either sync / async
- send(HttpRequest, BodyHandler): block until requst send, response received
- sendAsync(HttpRequest, BodyHandler) return immediately with `CompletableFuture<HttpResponse>`


# TCP/UDP
in TCP,
BIO: ServerSocket/Socket
NIO: ServerSocketChannel/SocketChannel
AIO: AsynchronousServerSocketChannel/AsynchronousSocketChannel

| software  | IO             | protocol                    |
|-----------|----------------|-----------------------------|
| <=tomcat  | BIO            | http                        |
| >=tomcat8 | NIO            | http, websocket             |
| netty     | NIO            | tcp,http,ftp,smtp,websocket |
| dubbo     | based on netty | dubbo                       |

| software        | IO      | protocol   |
|-----------------|---------|------------|
| OkHttp          | BIO     | http,https |
| WebSocketClient | BIO/NIO | websocket  |
| WebClient       | NIO     | http,https |

## SockJS / Socket.IO
not all browser support websocket, 
if not support, change to Ajax poll,SSE
- use bst transport available (websocket, xhr-streaming, xhr-polling)

use packaged websocket/other solution: SockJS / Socket.IO

for Spring framework, recommand SockJS



















