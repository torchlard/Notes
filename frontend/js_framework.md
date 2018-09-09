# fundamental
## basic components
- URL: access what webpage
- Data: show what msg
- View
- Action: what operation on view
- API Server: data source

in redux, there are many solutions for each part

## URL > Data
routing:
  react-router + react-router-redux

sync route msg to state, then can show different msg according to route

## Data
1. plain object
2. immutable.js / seamless-immutable

## Data > View
req: filter data and select data

## css 
css-modules
bem, rscss

## Action <> Store
unify business logic, async operation

redux-saga / redux-observable
redux-thunk, redux-promise

## Data <> API Server
req: async request

isomorphic-fetch






