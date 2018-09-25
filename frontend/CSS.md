# CSS Houdini
solve
1. cross-browser issue
2. CSS Polyfill difficulty

## process
JS > style > layout > paint > composite

JS, style => parser > DOM/CSSDOM > Cascade
          => CSS parsing api, css typed OM, TBD
          => CSS properties and values API

layout, paint, composite
  => CSS layout api, css painting api, composited scrolling and animation
  => worklets

## box tree api
there's box model in every DOM tree
when parsing element -> separate in fragments
get fragment info from DOM 

## CSS layout api
layout module = value of display (eg. display: grid/flex)
developer write own layout module
declare:
`registerLayout('block-like', class extends Layout{...}`
use:
`.wrapper{ display: layout('block-like') }`

## CSS painting API
declare:
`registerPaint('simpleRect',  class {...}`
use: 
`.div-1 { background-image: paint(simpleRect); }`

## worklets
similar to web worker: independent from main thread, not directly work with DOM
hook developer's code to CSS engine, will be more lightweight and shorter lifecycle
  compared to web worker

### animation worklet
go into composite process  

## CSS Typed OM
enhanced CSSOM: turn all string value to meaningful type definition in js
```js
elem.outputStyleMap.set('transform',
  new CSSTransformValue([
    new CSSTranslation(
      0, new CSSSimpleLength(100 - currentPercent, '%'), 0
    )
  ]))
```

## CSS-in-JS
### pro
local namespace, smarter critical CSS extraction,
dynamic styles, shared style values, manageable API
### cons
size/performance overhead
reinvent toolchain

## external API
developer customize components -> authors compose with components

## CSS-out-of-JS
just override by any selector, easy yet fragile
try to keep markup stable






























