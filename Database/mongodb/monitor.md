# free monitoring
`db.enableFreeMonitoring()`
get url for monitor

`db.getFreeMonitoringStatus()`

# mongostat
show current db status
`mongostat -h <host> -u <user> -p <pwd> --authenticationDatabase admin`

# mongotop
show running query
`mongotop -h <host> -u <user> -p <pwd> --authenticationDatabase admin`

# monitor replica set
`rs.status() = db.adminCommand({replSetGetStatus: 1})`

# profiling
## log level
0: profiler off, not collect any data
1: profiler collects data take longer than slowms
2: collect data for all operations
slowms: default 100 ms

`db.getProfilingLevel()`
sampleRate=1 : all slow operations are profiled, can set between 0 and 1
was: current profiling level

`db.setProfilingLevel(1, {slowms: 200, sampleRate: 0.3})`

# check status
db.serverStatus()

## locks
acquireCount: #times lock acquired
acquireWaitCount: num of times lock acquisition encountered wait because lock held in conflicting mode
timeAcquiringMicros: cumulative wait time in microseconds












