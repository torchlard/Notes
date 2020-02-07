# beats
filebeat: realtime insight into log data
packetbeat: analyze network packet data
winlogbeat: analyze windows event log
metricbeat: ship, analyze metric
hearbeat: ping infrastructure
auditbeat: send audit data to elasticsearch
functionbeat: cloud data with serverless infrastructure
journalbeat: analyze journald logs


# namspacing
separate beat index data
```yaml
output.elasticsearch.index: 'beat-%{[agent.version]}-%{+yyyy.MM.dd}'
```






















