# intro
block editor introduced in WordPRess 5.0 written in JS, 
code run in browser, not on server
=> richer and dynamic user experience


## create block
can create static, dynamic (render on server) block
block capable of saving data to post meta

## extending block
modify, remove block using filters

registerPlugin: define all plugin UI elements in one place

## met aboxes
port php meta boxes to 


# registerBlockType
edit, save are key parts of a block

most properties set in block.json

category: common, formatting, layout, widgets, embed

# block attribute
way a block stores data
define how a block parsed to extract data from saved content

```js
registerBlockType('create-block/gutenpride', {
  apiVersion: 2,
  attributes: {
    message: {
      type: 'string',
      source: 'text',
      selector: 'div',
      default: ''
    }
  }
})
    
```

# full site editing
## site editor
cohesive experience to directly edit and navigate between template, styling options

## template editing
edit template

## theme block
new block in tradition template

## navigation block
allow edit site's navigation menu








