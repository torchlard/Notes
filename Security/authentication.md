# Oauth
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


# PKI (public key infrastructure)
set of rules, policies, hardware, software, procedures needed to create, manage, distribute, 
use, store, revoke digital certificates; manage public-key encryption
- simple passwords no enough, need more rigorous proof of identity

registration authority(RA): verifies identity of entites request digital cert stored at CA
central directory: where key stored and inexed
certificate management system: manage access to stored cert, delivery of cert
certificate policy: PKI's requirement, allow outsiders analyze PKI's trustworthiness
timestamp authority: guarantee time and associates it to specific data

## certificate authority(CA)
store, issue, sign digital certifiacate

TLS certificate
major CA: Symantec, Commodo, GoDaddy

### temporary cert
server as offline CA within single sign-on system
server issue digital cert into client sytem, never store them
common used with X.509 bsed cert

### blockchain based PKI
suitable for storage and management of public keys
known PKI: CertCoin, FlyClient, BlockQuick

## Use
Enryption and sender authentication of email
encryption and auth of documents
authentication of users to applications
bootstrap secure communication protocols

## implementation
OpenSSL: simplest form of CA and tool for PKI
OpenCA
XCA
CFSSL: by CloudFlare
Libhermetik


# X.509
standard defining format of public key certificate
use in TLS/SSL, basis of https
X509 cert contains public key and identity(hostname / organization / individual)
signed by CA / self-signed

2. defines certificate revocation lists
   - cert deemed invalid by signing authority
3. certification path validation algorithm
  - cert signed by intermediate CA, eventually reaching trust anchor
















