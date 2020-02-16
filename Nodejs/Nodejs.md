# module
if internal module, no need resolve path

# process
## async process creation
method: spawn, fork, exec, execFile

each method returns ChildProcess instance
objects implement EventEmitter API, allow register listener function to monitor lifecycle of child process

unix: execFile() more efficient, since not spawn shell by default
windows: .bat/.cmd not executable on their own without terminal

default decode output as UTF8, pass string to callback
if timeout>0 (ms), parent will send signal identified by killSignal property

### exec
command run with space-separated args
`exec('"test.sh" arg1 arg2')`

### execFile
similar to exec() except that not spawn shell by default
executable file spawned directly as new process, slight more efficient than exec()

### fork
special case of spawn(), specifically to spawn new Node.js process
spwaned nodejs child process independent of parent, except IPC communicaiton channel established
each process has own memory, own V8 instance

### spawn
spawn new process

## optins.stdio
configure pipes that established between parent and child rpocess

## synchronous process creation
block nodejs event loo, pausing additional code untila spawned process exit

### execFileSync
same as execFile except method will not return until child process has fully closed



















