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

