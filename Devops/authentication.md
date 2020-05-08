# cross domain Single Siogn on
when user singed in once, user can login to any application automatically

## token
string for client's request identifier
1. after first login, generate token and return to client
2. client store token in cookie / local storage
3. later request only need this token, don't need username and pwd

simple token: uid, time, sign
can use mac address/sessionid as token

## same domain SSO
write sessionid into browser cookie, each request use cookie
when token exprires, remove it from cookie

## cross domain SSO
when there's multiple system, auth process
1. user login menu to auth
2. after pass auth, generate new token
3. token <-> user save in map
4. write token to all domain's cookie
5. redirect page url

## same domain modify cookie
```java
Cookie[] cookies = request.getCookies();
...
```

## cross domain modify cookie
1. use HMTL script
```html
<script type="text/javascript" src="http://www.b.com/setCookie?cnam=token&cval=123456"></script>
```

2. P3P protocol

3. post request


## cross domain ajax
### jsonp
1. script tag
```html
<script>
  var script = document.createElement("script")
  script.src = "httpL//www.b.com/user_info_2?callback=showResult";
  document.body.appendChild(script);

  script.onload = function(){
    document.body.removeChild(script);
  }
</script>
```

2. jquery
```js
$.ajax({
  url: "http://localhsot:9090/query",
  type: "GET",
  dataType: "jsonp",
  jsonpCallback: "showData",
  success: function(data){
    console.info("call success");
  }
})
function showData(data){
  var result = JSON.stringify(data)
}
```
jsonp only suppot GET, can use in all browser

### CORS
security reason restrict cross domain http request 
CORS allowed in API container (eg. XMLHttpRequest / fetch)

if no `Access-Control-Allow-Origin` header in reqeust => invalid
CORS compatible to browser after IE8

in springMVC, use `@CrossOrigin`









