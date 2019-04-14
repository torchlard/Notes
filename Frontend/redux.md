# Redux

## definition
### state
data, can be normal object, immutable object, or other class
separate data from UI state
avoid nesting, use ID as primary key as database

### action
only describe what is happening, not how to change state
```js
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'build first app'
}
// multiple actions, put in module
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```
- reduce data sent in action


### reducer
combine action and state, develop some functions
input: state, action | output: state
```js
import {combineReducers} from 'redux'
const todoApp = combineReducers({
  visibilityFilter, todos
})
export default todoApp

// equivalent to

export default function todoApp(state={}, action){
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```


#### Never do these
modify parameter
impure operation: API request, route
use Date.now(), Math.random()


## three principle
### single data source
whole state store in single object tree, object tree only exists in unique store
### state read only
view and network request cannot directly change state
avoid race condition
action can log, serialize, store, test
```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```
### use pure function to modify
large reducer can be divided into multiple small reducers
