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











