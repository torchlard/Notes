# session
```
POST/login with username,pwd -->
                create user session (sessionID)
<-- return logged in cookie to browser
do authenticated request, send cookie -->
                ckeck session based on cookie,
                authenticate user
<-- send response to client              
```
## problem
- server side need store session
- session will be searched many times, usually stored in memory
- if use cookie to store sessionID, need CORS, susceptible to CSRF

# Json web token (JWT)
compact, self-contained way to securely transmit information as JSON object
signed using secret | public/private key pair using RSA

when user successfully login, json web token returned and saved locally 
- JWT is self-contained, all necessary info is there
- can use stateless API, make request to downstream service
- easy to scale horizontally
- no need worry CORS, not rely on cookie
  
```
POST/login with username, pwd -->
               create JWT with secret
<-- return JWT to browser
send JWT on authorization header -->
        check JWT signature, get user info from JWT
<-- send response to client
```
## structure
```json
payload = {
  "iss": "John Wu JS",  // person who sign
  "iat": 141593,    // sign time
  "exp": 141678,    // expiration time
  "aud": "www.example.com",  // receiver
  "sub": "jrocket@example.com", // JWT target user
  // ... other useful fields
}
header = {
  "typ": "JWT",   // type
  "alg": "HS256"  // HS256 algorithm to sign {RS256, HS256}
}
```
JSON --base64--> JWT payload, JWT header
JWT_header+"."+JWT_payload --HS256--> signature

signature = HMACSHA256( jwt_header.jwt_payload, 256-bit-secret )
JWT = JWT_header+"."+JWT_payload+"."+signature

request = "http://your.awesome-app.com/make-frd/?jwt=xxxx.xxxx.xxxxx"

### HS256 VS RS256
HS256 default for client, RS256 default for API
HS256: symmertic MAC
- must share secret with any client/API that want to verify JWT
RS256: asymmetric signature
- private key sign JWT, different public key verify signature


## problem
since token stored in client side
- rely browser to delete token after logout
- control not in server side

## enhancement
1. access token (short time eg. 10 min), refresh token (eg. 7 days)
2. if access token not expired, return data to user
3. if access token failed, use refresh token to apply new access token
4. if refresh token not exipred, return new Access token
5. store jwt in HttpOnly cookie, not session/local storage

## session VS JWT
### scalability
1. need separate central sessio nstorage system to access
2. sticky session
VS 
no need to store user info in session

### security
signing JWT prevent tampering on client side, encrypted to enhance claim
JWT more vulnerable to CSS
malicious JS embedded on page to read, compromise content of your web storage

JWT incookie very susceptible to CSRF
-> make cookie only accessible by your domain

replay attack vulnerable
-> short expiration time
-> issuing JWT to specific IP address, use browser fingerprinting

### restful api
authentication state introduce side effect, break stateless restful principle

### performance
if lot of data encoded with JWT, significant amount of overhead for every HTTP request
with session, only session ID needed


# JWKS (json web key set)
json based standard for publishing public keys in REST endpoint

## structure
alg: algorithm of key
kty: key type
use: how key is used
x5c: x509 certificate chain
e: exponent for standard pem
n: modulus for standard pem
kid: unique identifier for key
x5t: thumbprint of x.509 cert

## steps
1. retrieve JWKS and filter for potential signing keys
2. extract JWT from request's authorization header
3. decode JWT and grab kid property from header
4. find signing key in filtered JWKS with matching kid property
5. use x5c property build certificate which vertify JWT signature



# OAth
not for authentication, is for authorization

## scenario
cloud service to print google photos
traditional method: tell cloud service username, pwd of google cloud
problem:
- cloud service store user pwd, not safe
- forced to always use pwd
- user cannot restrict what cloud service do
- if cloud service hacked, pwd leakage

## keyword
1. 3rd party applicaiton (eg. cloud service) [client]
2. HTTP service (eg. google)
3. resource owner (eg. user)
4. user agent (eg. browser)
5. authorization server (of service provider)
6. resource server (of service provider)
7. Redirect URI: where the authentication ends
8. scope: granular control
9. back channel: highly secure channel
10. front channel: less secure channel

## principle
set authorization layer between client and server
client cannot access service provider directly
- only use token access authorization layer
- specify token effective time, authorized to who

client use access token to get protected resource
- not using resource owner's account password
- access token got from authorization server
- get concensus of resource owner

```
client  auth request -------> resource owner
        <-- auth grant

        auth grant ---------> authorization server
        <-- access token

        access token -------> resource server
        <-- protected resource

```
front channel:
go to auth server, request consent from resource owner, back to redirect URI

back channel:
exchange authorization code for access token


## auth type 
1. authorization code (front channel + back channel)
2. implicit (front channel only)
not using 3rd party server, all done in browser
3. resource owner password credentials (back channel only)
give password to user agent
4. client credentials (back channel only)
user agent request auth in its own name, not behalf of client

## authorization code
```
resource owner
  |
user agent ---------- authorization server
  |                             |
client --------------------------
```

user agent must get authorization grant to get access token

### refresh token
user(resource owner) auth user-agent(client) to get new access token without new auth from user

## requirement
since use HTTP, so all connections must through https (TLS)
user-agent need to support http redirection

## client profile
### web applicaiton
confidential, run on web server
client credential & access token stored on server, not visible to resource owner

### user-agent-based application
public
client's program downloaded from web server and run by user-agent 
seamless authorization

### native application
public, installed and run on resource owner's device
credentials (access token, refresh token) protected

## Bearer Token
demonstrate usage of token and define it

bearer token = a kind of access token
1. in HTTP header
```
GET /resource HTTP/1.1
Host: server.example.com
Authorization: Bearer mF_9.B5f-4.1JqM
```
2. in request body
```
POST /resource HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

access_token=mF_9.B5f-4.1JqM
```
3. query param in URI (not recommended)
```
GET /resoure?access_token=mF_9.B5f-4.1JqM
Host: server.example.com
```

### enhancement
use ID point to actual info
TLS
must not stored in cookie
sufficiently short expiration time token
scope to restrict area

# OpenID
for authentication
stack:
[OpenID Connect]
[OAuth 2.0     ]
[HTTP          ]

original: scope: profile
new: scope: openid profile

exchange authorization code for access token and ID token










