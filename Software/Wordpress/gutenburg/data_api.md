# data store
modular units that store different parts of WordPress or plugin state

core
core/blocks
core/editor
...

## methods
wp.data.select() : get data
wp.data.subscribe() : called when state update
wp.data.withSelect : HOC for select()

```js
const {select} = wp.data
select(STORE_NAME).selectorMethod()
```

```js
const {subscribe, select} = wp.data

const unsubscribe = subscribe(() => {
  const blockCount = select("core/editor").getBlockCount()
  console.log(blockCount)
})

unsubscribe()

```










