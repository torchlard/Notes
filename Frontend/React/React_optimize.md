# memo
similar to React.PureComponent, control when functional component re-render

```js
const FunComponent = () => (
  <div>i am fn component</div>
)

const comp = React.memo(FunComponent)
```
when props and state changed, React will check if prev state and props different from next props & state
if different, components will re-render












