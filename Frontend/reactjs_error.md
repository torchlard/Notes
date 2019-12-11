# Watch mode on Linux causes a ENOSPC Node.js error
reason: max_user_watches not high enough
solution:
echo fs.inotify.max_user_watches=2048000 | sudo tee -a /etc/sysctl.conf & sudo sysctl -p

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

# Whitespace text nodes cannot appear as a child of <tr>
reason: empty space around tr
solution: { xxx ? xx : null}
don't use '' in condition, use null




