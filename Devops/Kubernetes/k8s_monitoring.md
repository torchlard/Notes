# DaemonSets
create special pod called DaemonSets
ensure all node run copy of pod; when node removed, pods are GC

use:
run cluster storage daemon: glusterd, ceph
run log collection: fluentd, filebeat
node monitoring daemon: prometheus node explorer, flowmill, collectd, Datadog agent 

# Heapster


# resource metrics pipeline
metric (cpu, memory ...) available through metrics API
discoverable under `/apis/metrics.k8s.io`
api defined in `k8s.io/metrics`

## metric server
cluster-wide aggregator of resource usage data
deployed by `kube-up.sh` as deployment object

# summary
## core metrics pipeline
kubelet, resource estimator, metrics-server (slimmed down Heapster)

## monitoring pipeline
collect various metrics from system, expose thhem to end-users
 - to horizontal Pod Autoscaler
 - to infrastore 

# custom external metric API
helm install --name prometheus-adapter ./prometheus-adapter

kubectl get — raw “/apis/custom.metrics.k8s.io/v1beta1/” | jq











