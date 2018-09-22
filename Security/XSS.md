# XSS
cross site scripting
## danger
釣魚, steal cookie, get private info
hook on session, send email, transaction


## reflected cross-site scripting
`http://www.test.com/search.php?key="><script>alert("XSS")</script>`
`xx.asp?out=1&url=javascript:alert(document.cookie)`

code exposed in URL arguments, need click to trigger
can enocde in hex, decimal... to confuse user 

### persistent cross-site scripting
hacker upload code to server
when user access website, user suffer from attack










