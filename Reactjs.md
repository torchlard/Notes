# trouble
## can't resolve 'babel-loader'
npm install babel-loader
correct syntax:
'''
rules: [{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query:{
    presets: ['es2015', 'react']
  }
}]
'''

## react2.default.PropTypes is undefined
import PropTypes from 'prop-types';
npm install prop-types
React.PropTypes.string -> PropTypes.string

## missing dep
npm install --save-dev eslint-plugin-import@^2.7.0 eslint-plugin-jsx-a11y@^6.0.2 eslint-plugin-react@^7.4.0 eslint-plugin-import@^2.7.0
enhanced-resolve

## cannot find module 'eslint/lib/formatters/stylish'
npm install eslint -S

## Module not found: Error: Can't resolve 'User' in '/home/lkit/Programming/JavaScript/React/src'
const resolve = require('enhanced-resolve');
const path = require('path');
resolve: {
  extensions: ['.js','.jsx'],
  modules: [path.resolve('./node_modules'), path.resolve('./src/components')],
},
- add 'index.js' file under each import directory

## TypeError: _this.props.history __

## unexpected token for ...rest (rest parameter)
npm install --save-dev babel-plugin-transform-es2015-destructuring babel-plugin-transform-object-rest-spread
.babelrc:
  "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]

## _this2 __ is undefined
### reason
incorrect this reference
### solution
insert this line in constructor(props):
this.<func> = this.<func>.bind(this);

## Error: defaultState for reducer handling SHOW should be defined
add function for SHOW action

## expect an assignment or fuctional call and instead saw an expression
change { xxx } to ( xxx )

--------------------------------------------------

# concept
## component
only 1 node is allowed in 1 component

## export component
//Mycomponent.jsx
export default Mycomponent
...
import Mycomponent from './Mycomponent'


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















