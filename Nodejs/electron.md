# Architecture
main process runs `package.json`'s `main` script
always has 1 main process

renderer process: each web page in electron runs in its own process
web page are sandboxed, cannot access native 
  VS 
electron can use Node.js to do so

## main process vs renderer process
create webpage by creating `BrowserWindow` instance
when BrowserWindow destroyed, renderer process also terminated
main process manage all web pages, each renderer process isolated

communicate between process: ipcRenderer, ipcMain

# API
require('electron'), new BrowserWindw()









