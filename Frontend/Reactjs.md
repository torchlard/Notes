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




















