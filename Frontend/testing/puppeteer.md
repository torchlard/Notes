# intro
launch headless chromium

## goal
- slim, canonical library that highlights capaciy of DevTools Protocol
- ref implementation for similar testing libraries
- headless/automated browser testing
- help new DevTools Protocol features

## VS Selenium/WebDriver
Selenium: cross-browser automation, single standard API work across all major browsers
Puppeteer: focus on Chromium

### adv
- zero setup, comes bundled with Chromium version works best
- event-driven architecture, removes lot of potential flakiness
- run headless by default, make it run faster
- expose browser context, can efficiently parallelize test execution
- when set "headless" to false, can see what browser is doing

# concept
## trusted input event
trusted event: generated by user interacting with page (eg. mouse, keyboard)
untrusted event: events generated by Web APIs (eg. createElement, element.click())

## navigation
anything that changes page's URL, includes anchor navigations, history API
works seamlessly with single-page applications


# features
## debugger
nodejs: running test code
browser: running application code begin tested
  - debug code inside `evaluate()`

# overview
```
puppeteer 
  - browser
    - browser context 1
    - browser context 2
      - page1
        - frame1
        - frame2
      - page2
```
Puppeteer: communicates with browser using DevTools Protocol
Browser: instance can own multiple browser contexts
Browser Context: instance defines browsing session, can own multiple pages
Page: at least 1 frame (main frame)
  - maybe other frames created by iframe / frame
Frame: at least 1 execution context
Worker: single execution context

# puppeteer-core
puppeteer: product for browser automation
puppeteer-core: drives using puppeteer-core'
  - ignores all PUPPETEER_* env variables

## use case
- build another end-user product / library
- bundling Puppeteer to use in Chrome Extension
- building set of tools where puppeteer-core is one of ingredients

# environment variable
HTTP_PROXY, HTTPS_PROXY, NO_PROXY
PUPPETEER_CHROMIUM_REVISION
PUPPETEER_EXECUTABLE_PATH
PUPPETEER_PRODUCT: 'chome'/'firefox'

# api
## launch
product, ignoreHTTPSErrors
headless, executablePath
defultViewport, args
















