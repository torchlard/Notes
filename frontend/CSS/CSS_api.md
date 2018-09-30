## UI
border, outline (outside border)

box-sizing: changing box-model
resize: make any element resizable in 1 / 2 directions
text-overflow: what shown for overflow text at the end
caret-color

## media query
width, height; device-width, device-height
orientation, aspect-ration, device-aspect-ratio
color, color-index, monochrome, resolution
scan, grid

- device-width: width of rendering surface of output device [width of screen]
- width: width of targeted display area [viewport]
eg. iPhone4 use 2 device pixel per CSS pixel 
(because not every website build responsively, try to accomodate desktop view)
iPhone4 (640 x 960) => device-width of iPhone4 = (320 x 480)

- color: number of bits per color component of output device
- color-index: number of entries in color lookup table
- scan: scanning process of "tv" output device
- grid: whether output device is grid / bitmap (grid: eg. "tty" terminal, only 1 font )

### media-query level 4
not, only
update, block-axis overflow: overflow-block, overflow-inline
color-gamut
interaction media features: pointer, hover, any-pointer, any-hover
- pointer: none, coarse(primary input mehtod not accurate, eg. finger on touch screen)
  + fine: eg. mouse / trackpad
- hover: none, on-demand: can perform hover action, but not by simply hover over element (eg. require long press)
  + hover: simply hover over

- overflow-block: describe what happen when content overlfows initial containing block

media feature: more fine-grained test than media types, testing specific features
  (feature name: feature vlaue), (feature name), (range from)

media types: all, print, screen, speech (for speech synthesizers)

### level 5 [non standard]
light-level, prefers-reduced-(motion,transparency), prefers-contrast, prefers-color-scheme
scripting, inverted-colors


## Color
RGB, RGBA, 'transparent', HSL, HSLA
'currentColor'

```css
div {
  color: red;
  border: 5px solid currentColor;
  box-shadow: 0 0 5px solid currentColor;
}
```

## background and border
background-(color,image,repeat,attachment,position,clip,origin,size)
border-(color,style,width,radius)
border-image-(source,slice,width,outset,repeat)
border-shadow

- background-attachment: background fixed with regrad to viewport / scroll along element or content
- background-origin: set orgin position of background (padding-box|border-box|content-box)
- background-clip: set clipping area of background
- border-image-slice: slice source image, only part of it remains to fill border


## cascading and inheritance [CR]
(declared, cascaded, specified, computed, used, actual) values
@import
!important

## fonts
font-(family,weight,stretch,style,size,size-adjust)
@font-face, src

## selector
### level 3
type: eg. h1
universal: *, ns|*, *|*, |*
attribute: [att], [att=val], [att~=val], [att|=val]
class: .class
id: #id
pseudo-classes
- :link, :visited
- :hover, :active, :focus
- :target; :lang
- :enabled, :disabled, :checked, :indeterminate
- :root, :nth-child(), :nth-last-child() ...
paseudo-elements
- ::first-line, ::first-letter
- ::before, ::after

### level 4
scoped
relative
logical: :matches(), :not(), :something(), :has()
linguistic: :dir(), :lang()
location: :any-link, :local-link, :target, :scope, :target-within
user-action: :focus, :focus-visible, :focus-within, :drop, :drop()
time-dimension: :current, :past, :future
resource-state: :playing, :paused
input: :enabled, :disabled, :read-only, :read-write, :placeholder-shown, :default
       :checked, :indeterminate, :valid, :invalid, :in-range, :out-range, 
       :required, :optional, :user-invalid
structural: :root, :empty, :blank
            :nth-child(), :nth-last-child(), :(first,last,only)-child
            :nth-of-type(), :nth-last-of-type(), :(first,last,only)-of-type


## paged media
differ from continuous media, content split into discrete static display surfaces
describe how:
- page break created and avoided
- size, orientation, margin, border, padding
- headers, footers
- contents (eg. page counter) in headers and footers
- orphans and widows
### structure
page sheet
  non-printable area
    printable area
### page model
page box: page margin > page media > page padding > page area
###
page selector: :left, :right, :first, :blank
page margin box: auto, min-width, max-width
page size
page break


## multi-column layout
column-width, column-count, columns
column-gap, column-rule-(color,style,width)
break-(before,after,inside)
column-span, column-fill

## generated content for paged media
content(). string()
running(), element()
target-counter(), target-counters()

## 
### writing-mode
1. horizontal direction can have margin overlap
2. margin: auto for vertical alignment

### module
1. path must add (/ ./ ../) or absolute path
2. default defer => async loading, keep order
3. inline script also defer
4. support async
5. module only execute once
6. always CORS needed
7. module default no certificate; where convension js loading with certificate
8. default strict mode

```html
    <button id="btn">click me</button>
    <video controls name="media" ></video>
    <script>
      const video = document.getElementsByTagName("video")[0];
      document.getElementById("btn").addEventListener("click",
        async event => {
          event.preventDefault()
          try {
            const module = await import('./xx.js')
            module.loadVideo(video)
          } catch(err) {
            console.error(err.message)
          }
        }
      )
    </script>
```
```js
// xx.js
export const loadVideo = dom => {
  const source = document.createElement("source");
  source.setAttribute("src", "./sample_video.mp4")
  dom.appendChild(source);
} 
```

























