# nyc
instruments ES5 and ES2015+ js code with line counters
track how well unit-tests exercise codebase
stat on statement,line,function,branch

work well with most JS testing framework: tap, mocha, AVA

`npm i nyc`
```json
{
  "scripts": {
    "test": "nyc mocha"
  }
}
```

# code coverage test
## implementations
1. proxy
  - work for function/attribute access, difficult for expression / conditional statement
2. AST rewrite for source code 
  - convert source code to IR of AST, record calling frequency and actual value, return to original JS
  - usage: loader/plugin in webpack, nyc
3. use counter in JS engine
  - restricted to exposed interface 

## process
1. convert JS file in src/ and cache them
2. put mocha args in child_process, call mocha to run tests
3. test cached source code, do stat and record in variables
4. send statistics to file `.nyc_output`
5. call `report()`, read .nyc_out and convert to html, store under coverage dir








