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

# Versions
## CSS 1 [1996]
font, color, text spacing, alignment of text, image, tables
margin, border, padding, positioning, pseudo classes, cascade
## CSS 2 [1998]
z-index, media types, positioning(absolute, relative, fixed)
box model, selectors, generated content
## CSS 2.1 [2004 - 2011]
fix errors in CSS 2, remove poorly supported / not fully interoperable features
add implemented browser extensions

## CSS 3 [2014 - now]
- divided into several modules, extend features in CSS 2
- most modules are level 3: build on things from CSS 2.1
- new functionality (eg. flexbox) are level 1
media queries, selector (L3, L4), namespace, color L3, MathML
background+border, multi column, speech, syntax L3
flexible layout, basic UI, masking, grid layout
animation, transition, transforms, paged media

- modules
background, box, cascade-3, color, content, fonts-3, gcpm, layout, mediaqueries,
mediaqueries-4, multicol, page, selectors-3, selectors-4, css3-ui

## CSS 4 [ongoing]
"level4" modules in CSS 3
- snapshots: collection of modules and parts of other drafts considered stable
- [2007, 2010, 2015, 2017]

# Limitation
1. cannot select parent/ancestor of an element that satisfies certain criteria
2. cannot declare new scope independently of position
  eg. z-index finding closest parent with position:absolute have undesired effect
3. pseudo-class dynamic behavior not controllable
4. cannot name rules
5. cannot include styles from rule to another
6. cannot target specific range of text




















