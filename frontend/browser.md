# render pipeline
JS > style > layout > paint > composite

in js and style stage, parse and build render tree
=> DOM, CSSOM

nowadays developer can control DOM and CSSOM via JS, but
no control on layout, paint, composite

render tree = DOM tree + CSS

1. JS: load and execute js/css
2. style: calc style by js and css
3. layout: when style go into element, browser check if affect overall arrangement,
   and possibly rearrange
4. paint: redraw modified elements
5. composite: combine all elements   

reflow = compute layout of page

only change color, image src -> paint
scroll webpage, css animation -> composite














