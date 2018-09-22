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
generate random session ID, should not be URL
limit login 

## 3. sensitive data exposure
no extra protection, eg. encryption
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











