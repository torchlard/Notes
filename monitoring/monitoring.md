# USE method
principle: for every resource, check utilization, saturation and errors

resource: cpu, disk, busses ...
utilization: average time resource was busy servicing work
  - percent over time interval
saturation: degree which resource extra work it can't service, often queued
  - queue length
errors: count of error events 

low utilization != no saturation
- burst of high utilization can cause performance issue


# Heapster
deprecated in favour of metric server
handy tool for cluster monitoring and performance analysis

# Prometheus
open source system monitoring and alerting toolkit
standalone, in nature time-series database

## data structure 
`Metricname{key1="value1",key2="value2"}value`
eg. 3 cpu load for web_01 host `cpu_load{host_name="web_01"}3`

## metric type
counter
gauge
histogram
summary

## features
- multi-dimensional data model with time series data identified by metric name and key/value pair
- PromQL (flexible query language)
- autonomous single server node
- time series colleciton via pull model over http
- pushing time series supported bia intermediate gateway
- target discovered via service discovery / static configuration
- multiple mode graphing and dashboard

## components
Prometheus server: scrapes, store time series data
push gateway: temporary job push
exproter: expose 3rd party service's metric to server (eg. HAProxy,StatsD, Grphite)
Alertmanager: handle alerts (eg. email, pagerduty, OpenGenie, Webhook)
client library: return live metrics

## use case
work well for recording purely numeric time series
highly dynamic service oriented architectures  

## not for
logging or tracing
automatic anomaly detection
scalable or durable storage


# Grafana
open source analytics and monitoring solution for every database
provide visualization for Graphite metrics

# Filebeat



# Prometheus VS Zabbix
1. better use case
Zabbix cannot
- collect and monitor data other than host server
- monitor container scheduling across host
- monitor Paas / Saas
- monitor business system, IOT
Prometheus collected data don't need to bind to specific host instance

2. big data collection, analysis, warning
do complex analysis like time variance instead of simple high CPU warning
easier and earlier spot out problem and locate it

3. security
pull http endpoint periodically, no bidirectional communication
even hacked, cannot write to monitored system

# Prometheus VS Graphite VS Grafana
|                                  | Grafana | Graphite                  | Prometheus                 |
|----------------------------------|---------|---------------------------|----------------------------|
| Visualization, dashboard editing | best    | good,no dashboard editing | excellent,difficult to use |
| Time series storage              | no      | yes                       | yes                        |
| query language                   | no      | yes                       | yes                        |
| data collection                  | no      | no                        | yes                        |
| plugin, extensibility            | yes     | yes, no plugin library    | yes, exporter              |
| alarming, event tracking         | no      | only event tracking       | complete support           |
| cloud monitoring                 | best    | some                      | yes                        |



# ELK stack
elasticsearch + logstash + kibana
fulfill need in log management and analytics space

## motivation
low efficiency using grep/awk to get info from logs
difficult to archive logs, slow search on log
need multi-dimensional query, centralized log management

## small size
```
beats             -> [redis|kafka|rabbitmq] -> logstash -> elasticsearch <- kibana
(data collection)      (optional buffering)   (processing)  (storage)      (analysis)
```
## disadv
1. logstash do all collection and filter of log, high resource usage
2. in high concurrency, if no message queue, data easily lost



# EFK
*beat replace logstash to get logs









