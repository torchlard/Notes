# Express
## middleware
early: include all router, form parser in same project
later: divide into many modules, independently maintain / community middleware

API rich, based on callback

## procedure
express() get server instance
req(request), res(request)

use(middlewares()). sequence and rules of use controlled by express itself
```js
app = (req, res, next) => app.handle(req,res,next)
```
after handle get control, dispatch request to router

when express loads, middleware function stack registered will be called
next() in handle is key, every middleware need to run `next()`
  - to pass control by form of callback to next middleware

# Koa
new Koa() get server running instance
`request` and `response` in ctx refer to req and res in Express
ctx control all context obj, freely contact any object






