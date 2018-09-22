# things to setup
1. have nodejs, npm installed globally
2. npm init
3. npm i webpack webpack-cli
4. set sth like `"dev": "webpack --mode development"` in package.json
5. `npm run dev` to try out

# concept
webpack = static module bundler for JS application
recursively builds dependency graph that indicate every module needed
  => package all into >= 1 bundles

# Loader
transformation applied on source code of a module => pre-process file as you `import` them
transform lang: TypeScript -> JS, import CSS file
- can be chained, applied in pipeline
- accept query parameters

# module resolution
import foo from 'path/to/module'
import "../src/file1"
require('path/to/module')
import "module";  <== searched for inside all directories specified in `resolve.modules`

# HtmlWebpackPlugin
generate an HTML5 file that include all webpack bundles in body using <script> tag

# Output
tells webpack how to write compiled files to disk

# webpack4
## zero config
entry point (src/index.js)
output (dist/main.js)
mix production and development mode




