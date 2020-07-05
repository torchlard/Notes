# function
1. data query: debug and locate problem
2. service metric: know server loading and service status
3. data analysis: eg. find top 10 slow query

# log management
aggregation: collect and ship logs from multiple data source
processing: transform log msg into meaningful data for easier analysis
storage: store data for extended time for monitoring, trend analysis, security use case
analysis: dissect data by quering, creating visualization and dashboard on top of it

# linux journalctl
## syslog disadv
1. unsafe, msg cannot be verified; eg. every process can claim it's Apache
2. data no strict format, difficult to parse
   
## adv
1. simple, low dependency
2. don't need to maintenance, auto manage space
3. portable
4. high performance, use binary
5. save all events in single data storage, all context preserved (including kernelsapce,userspace)
6. extensible
7. journal can be verified, cannot modify

## command
-b: since current boot
-t: search certain tag









