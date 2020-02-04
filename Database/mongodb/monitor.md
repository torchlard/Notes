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

# server status
`db.serverStatus()`

## asserts
cumulative number of assertions raised 
asserts/user: errors that user may generate, eg. out of disk space, duplicate key

## locks
acquireCount: #times lock acquired
acquireWaitCount: num of times lock acquisition encountered wait because lock held in conflicting mode
timeAcquiringMicros: cumulative wait time in microseconds

## connections
current: num of incoming connections, including all shell session
active: connection currently have operations in progress

## flowContorl
if flow control enabled, write on primary must obtain tickets before taking locks
targetRateLimit:  maximum number of tickets acquired per second (primary node)
timeAcquiringMicros: total time write operations wait to get a ticket
sustainerRate: operations applied per second by secondary
isLagged: whether flow control has engaged if majority committed lag > flowControlTargetLagSeconds

## logicalSessionRecordCache
activeSessionCount: num of active local sessions cached in memory
sessionCollectionJobCount: num of times refresh process run on config.system.sessions

## network
bytesIn: amount of traffic received by this database
numRequests: num of distinct requests that server received

## wiredTiger
LSM: stats on log-structured merge tree
async: async operation api stats
block-manager: block manager operations
cache: cache and page eviction from cache


# admin command
## hostInfo
`db.adminCommand({hostInfo: 1})`
system mem, os type, metadata, operation time

## get command line config
`db.adminCommand({getCmdLineOpts: 1})`

## connection status
db.adminCommand({connectionStatus: 1})

## top
`db.adminCommand("top")`
return usage stat for each collection, amount of time (microsecond) and count of operations

sort by readlock time desc
```js
let total = db.adminCommand("top").totals
let arr = []
for (let name in total){
    // if(name.includes("i18n")) 
    if(total[name].total)
        arr.push({name: name, stats: total[name]})
}
arr.sort((a,b) => b.stats.readLock.time - a.stats.readLock.time )
print(arr)
```







