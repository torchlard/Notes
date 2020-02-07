# Kibana
open source solution to visualize elasticsearch data
use Vega grammar

# command
start `kibana`
OR `sudo -i service kibana start`

# directory layout
bin: kibana-plugin to install plugin
data: data fiels written to disk by kibana and its plugins
optimize: transpoiled source code


# inspect index
1. management > Index Patterns > Create index pattern
2. Discover > (change) {switch to target index} > Selected fields > filter by KQL

# KQL (kibana query language)

# timelion
time series visualization

graph
```
.es(index=metricbeat-*, timefield='@timestamp', metric='avg:system.cpu.user.pct').label('current').lines(fill=1,width=3.5).color(#888),
.es(offset=-30min,index=metricbeat-*,timefield='@timestamp',metric='max:system.cpu.user.pct').color(yellow),
.es(offset=-30min,index=metricbeat-*,timefield='@timestamp',metric='max:system.cpu.user.pct').if(gt, 1.25, .es(offset=-30min,index=metricbeat-*,timefield='@timestamp',metric='max:system.cpu.user.pct'), null ).label('warning').color(#F00),
.es(index=metricbeat-*,timefield='@timestamp',metric='max:system.cpu.user.pct').derivative().multiply(-1).label('change')
.title('cpu usage over time')
```

# management
## ILM (information lifecycle management)
strategy for adminstering storage system on computing devices





















