# java9 jdk.incubator.http
## HttpClient http
send request, get response
HttpClient created through builder
once built, immutable, send mutable request

BodyHandler must supplied for each HttpRequest sent

## Request
either sync / async
- send(HttpRequest, BodyHandler): block until requst send, response received
- sendAsync(HttpRequest, BodyHandler) return immediately with CompletableFuture<HttpResponse>








