# concept
webpack = static module bundler for modern JS applications
internally builds dependency graph => maps every module project needs, generate >= 1 bundles
not require config file

# things to setup
1. have nodejs, npm installed globally
2. npm init
3. npm i webpack webpack-cli
4. set sth like `"dev": "webpack --mode development"` in package.json
5. `npm run dev` to try out

# Entry
entry point indicates which module webpack use to begin building dep graph
default `src/index.js`
`entry: './path/to/entry/file'`

# Output
tells webpack where to emit bundles it creates, how to name the files
default main output file `dist/main.js`, generated file `dist` folder


# Loader
out of box webpack only understands js and JSON files
loaeders allow webpack process other file types, convert into valid modules

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




# dev server
client job: connect to WebpackDevServer by socket, get notified about changes
when save file, client apply hot updates (CSS) / refresh page (JS change)














