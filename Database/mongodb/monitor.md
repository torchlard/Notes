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

# setPRofilingLevel
## log level
0: profiler off, not collect any data
1: profiler collects data take longer than slowms
2: collect data for all operations

slowms: default 100 ms





