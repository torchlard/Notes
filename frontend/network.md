# CORS (cross origin resource sharing)
mechanism use additional HTTP header to tell browser to let web app run at one origin (domain)
  have permission to assess selected resource from another origin

must match page's scheme, hostname, port
cannot different origin for XML, JSON

## allow
- invoke from XMLHttpRequest, Fetch
- web fonts
- WebGL texture
- image/video using drawImage
- stylesheet
- scripts

## simple requests
don't trigger CORS preflight
- GET, HEAD, POST
allow manually set:
- Accept, Content-Type, Viewport-Width, Width, Content-Language ..
only allowed Content-Type:
- text/plain, multipart/form-data, application/x-www-form-urlencoded
no ReadableStream used in request

## preflighted requests
first send HTTP request by OPTIONS method to resource to other domain,
  to determine whether actual request is safe to send
notify server will be sending:
- Access-Control-Request-Method  
- Access-Control-Request-Headers  

server then can determine whether it wish to accept request under these circumstances

response allowed parameters:
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Max-Age

## workaround
- change server-side behavior to avoid preflight/redirect
- change request to simple request
- make simple request to determine what URL real preflighted request end up at
  - make another real request using URL obtained

## HTTP response header
allow code from specific origin / all
`Access-Control-Allow-Origin: [origin] | *`
server whitelist headers that browser allow to access
`Access-Control-Expose-Headers: X-[Custom-Header], ...`
specify HTTP headers that can be used
`Access-Control-Allow-Headers: <field-name>[, ...]`

## HTTP request header
indicate origin of cross-site request
`Origin: <origin>`
issue preflight let server know what will be used
`Access-Control-Request-Method: <method>`

## requests with credentials
by defulat browser will not sent credentials
specific flag has to be set on `Request` constructor
eg. `invocation.withCredentials = true`


# fetch
fetch use CORS by default

## response
response interface of fetch API
create by `Response.Response()`
properties: (headers, ok, redirected, status, statusText, type[basic, cors],
  url, useFinalURL
Body.body, Body.bodyUsed

## no-cors
when server disable cors, you can still use mode: 'no-cors' in fetch to access resource,
but you cannot parse the content of request => opaque request

# window.URL
URL is to parse, construct, normalise, encode url

# JSONP
json with padding
used to request data from a server residing in a different domain than client

`<script>` allowed to retrieved from foreign origin, but not pure JSON data
## implement
URL request point to src attribute in `<script>`, with js code wrap around it
```html
<script type="appliation/javascript
        src="http://server.example.com/Users/1234">
</script>      
```
the "wrapped payload" then interpreted by browser, function already defined in js environment can
manipulate JSON data

## script element injection
`<script>` injected into HTML DOM dynamically, each time must add new script/reuse

## security problem
if json contain sensitive data, may not protected by same-origin policy







