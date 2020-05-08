# v2
remove api server in v1

## concept
federate: group k8s clusters to provide cross cluster deployment and access interface

KubeFed: Kubernetes Cluster Federation, cross cluster resource allocation, service discovery, high availability

Host Cluster: deploy Kubefed API, allow kubefed control plane

Cluster registration: join cluster members to host cluster

member cluster: use kubefed api to be managed by kubefed, host cluster can be member cluster

ServiceDNSRecord: record k8s service info, allow cross cluster acccess by DNS

IngressDNSRecord: record k8s ingress info, allow cross cluster acccess by DNS

DNSEndpoint: custom defined resource for (ServiceDNSRecord/IngressDNSRecord)














