# concept
## component
only 1 node is allowed in 1 component

## export component
//Mycomponent.jsx
export default Mycomponent
...
import Mycomponent from './Mycomponent'


## Reactive extension
combine well with redux

## store 
maintain state
getState()
displatch(action): update state
subscribe(listener): register listener
subscribe(listener): function listener


## Presentational Component
- how things look
- UI State
- functional components
- ex: page, sidebar, story, list
- data from props

## Contaienr
- how things work
- may contain both presentational, container components inside
- provide data, behavior
- call flux actions
- stateful
- higher order components, with class
- ex: UserPage, FollowerSidebar, StoryContainer
- data from redux state

# State
## setState
component accept arbitrary inputs and return React elements
must act like pure functions wrt. props
State allow React components change output over time in response to action, without violating rule
```js
// wrong
this.state.fullName = 'edura'
// correct
this.setState({
  fullName: 'edura'
})

// wrong
this.setState({
  counter: this.state.counter + this.props.increment
})
// correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}))
```

when setState(), react merge object provide into current state
state is local / encapsulated, not accessible to any component

```js
this.state = {
  value: '',
  list: ['a', 'b', 'c']
}
// add item to beginning
this.setState(state => {
  const list = [...state.list, state.value]
  return {list, value: ''}
})

// add item to end
this.setState(state => {
  const list = state.list.concat(state.value)
  return {list, value: ''}
})

// update every item in array
this.setState(state => {
  const list = state.list.map(item => item+1)
  return {list}
})

// update an item
<button onClick={() => this.onUpdateItem(index)} />
onUpdateItme = i => {
  this.setState(state => {list: state.list.map((item, i) => (j === i) ? item+1 : item)})
}

// remove an item
//// option1
this.setState(state => {list: state.list.filter((item,j) => i != j)})
//// option2
this.setState(state => {
  const [first, ...rest] = state.list;
  return {list: rest}
})

```

# input
not creating HTML input element, 
- but create React input object that happens to render as HTML input element
- event handling not actually use input events

state is always final authority, not "whatever UI library is used to render it" (DOM)
- just particular UI framework that React happens to be using

1. type in input element
2. nothing happen to element yet, event intercepted by React and killed
3. forward event to function set up
4. function schedule state update
5. React run update async, trigger render if update changed state



# ref
## when to use
sometimes want to modify child directly, outside typical dataflow
eg. focus, text selection, animation
## timing
happen before componentDidMount, componentDidUpdate

## when not use
can't use inside functional component, because no instance
## usage
parent passes its ref callback as `inputRef` prop to child


# How to inspect code
1. see state each container use in app
2. look for button you interest
3. view corresponding onClick in container
4. view linking functions in actions
5. view reducer with corres. action type


## handle async
like dispatch action for button, turn click async action to synchronous code in redux



# JSX
jsx is regular JS function call --compile--> JS object
```jsx
const name = 'Josh Perer'
const element = <h1>Hello world, {name}</h1>
```


# Router
## react-router
```jsx
// topicId: "rendering"
<Link to={`${match.url}/rendering`}>Rendering with react</Link>
<Link to={`${match.url}/components`}>Go to component</Link>

<Route path={`${match.path}/:topicId`} component={Topic} />

const Topic = ({match}) => (
  <div>
    <h3>{patch.params.topicId}</h3>
  </div>
)
```

## withRouter

not jump from router link
eg. directly input address to open
- put (hsitory, locaiton, match) into props


# higher order components (HOC)
function that takes a component, return new component
aim: abstract components with similar patterns to 

HOC add features to component without drastically altering component
HOC is pure function


# React hook
## rules
useState depend on order of calling

useEffect, useState always at top level
only call hooks at top level, don't call inside loops,conditions/nested fn

called in same order each time component renders

## lazy init state
```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

```

## useEffect
funciton in useEffect fires after layout and paint, during deferred event
- make suitable for common side effects, like subscript, event handlers
- DOM mutation cannot deferred

### useLayoutEffect
different fire time


# React context
data shared across components without pass by props

## useContext
`const value = useContext(MyContext)`

accept context object, return current context value 
- current context value determined by value prop of nearest `<MyContext.Provider>`

when nearest context update, trigger renderer with latest context value passed to that MyContext
use `useState` to change value in context provider

## useRef
like 'box' hold mutable value in its `.current` property

















