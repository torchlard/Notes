# fundamental
you can treat HTML DOM as classes of object that exist in browser,
with each object has properties (style, content)

JS has language binding with underlying C++ code in browser

# Tree
preorder, depth first traversal
children node: ordered set of objects

HTML namespace is: http://www.w3.org/1999/xhtml

# Events
events are dispatched t objects to signal an occurence (eg. network activity, user interaction)
implement EventTarget insterface, add event listener to observe events 

Event: objects, implement Event interface
`CustomEvent`: applications can dispatch events themselves
`preventDefault()`: terminate event, eg. form submission
`dispatchEvent()`: define own action after event dispatched

`capture`: target's ancestor response if capture=true
`bubble`: if true then ancestor will invoke event again

target: object that event is dispatched
currentTarget: obj that callback currently invoked

## properties
textContent: 
style

## practice
shouldn't use inline HTML event handler: bad practice
event handler less power, better cross-platform
DOM2 more powerful, less well supported (IE9)

## event object
automatically passed to event handler
```js
function bgchange(e) {
  e.target.style.backgroundColor = rndCol;
}
```

## prevent default
eg. user has some input data wrong when submit, need to stop submission
```js
form.onsubmit = function(e) {
  if (xxx) e.preventDefault();
}
```

## event bubbling and capture
two event handler of same event type is registered activated in one element










