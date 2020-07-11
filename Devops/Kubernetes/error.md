# [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd".
```bsh
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

mkdir -p /etc/systemd/system/docker.service.d

systemctl daemon-reload
systemctl restart docker
```

# [ERROR Swap]: running with swap on is not supported. Please disable swap
swapoff -a


# start as regular user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#  runtime network not ready: NetworkReady=false 
reason:NetworkPluginNotReady message:docker: network plugin is not ready: cni config uninitialized
you get this error because no CNI network has been defined in /etc/cni/net.d and you're apparently using the CNI network plugin
kubelet 參數多了 network-plugin=cni，但卻沒安裝 cni，所以打開設定檔把 network-plugin=cni 的參數移除

## solution
remove --network-plugin=cni in /var/lib/kubelet/kubeadm-flags.env
```
systemctl daemon-reload
systemctl restart kubelet
```
`kubectl get nodes` check if master ready


# \Unable to connect to the server: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#  0/1 nodes are available: 1 node(s) had taints that the pod didn't tolerate.
untaint all ndoes
`kubectl taint nodes --all node-role.kubernetes.io/master:NoSchedule-`

# events is forbidden: User "system:bootstrap:oj3cr7" cannot list resource "events" in API group "" in the namespace "default"
refer to 'Using RBAC Authorization'

# The connection to the server localhost:8080 was refused - did you specify the right host or port?
sudo cp /etc/kubernetes/admin.conf $HOME/
sudo chown $(id -u):$(id -g) $HOME/admin.conf
export KUBECONFIG=$HOME/admin.conf

# no endpoints available for service \"kubernetes-dashboard\"
kubectl apply -f https://docs.projectcalico.org/v3.11/manifests/calico.yaml

# cannot login to dashboard remotely
kube proxy dashboard only allow localhost

must reference to remote admin.conf and run `kubectl proxy` in local


# Nameserver limits were exceeded, some nameservers have been omitted, the applied nameserver line is: 8.8.8.8 8.8.4.4 127.0.0.1
situation: kubernetes coredns crashloopbackoff

[FATAL] plugin/loop: Loop (127.0.0.1:45245 -> :53) detected for zone ".", see https://coredns.io/plugins/loop#troubleshooting. Query: "HINFO 7608964748468724001.322644885862276866."

# reason: `loop` detection plugin detected infinite forwarding loop in one of upstream DNS servers
  - CoreDNS forwarding requests directly to itself, via loopback address (127.0.0.1, ::1, 127.0.0.53)
  - CoreDNs foreward to upstream server that in turn, forward back to CoreDNs
  - in k8s, when detects loop, pod start to "CrashLoopBackOff"
  - interaction with local DNs cache on hsot node
  - kubelet by default pass /etc/resolv.conf to all pods using default dnsPolicy

## troubleshoot:
  - look in Corefile for any `forward`s to zone
  - if `forward` is using `/etc/resolv.conf`, make sure not contain local address

## solution:
  1. add resolvConf: path/to/real/resolv/conf/file
    - for systemd-resolved, /run/systemd/resolve/resolv.conf typically real conf
  2. disable local DNS cache on host nodes, rstore /etc/resolv.conf to original
  3. dirty fix: replace forward . /etc/resolv.conf with IP addr of upstream DNS
    - eg. `forward . 8.8.8.8`

Hacky solution: Disable the CoreDNS loop detection

Edit the CoreDNS configmap:

kubectl -n kube-system edit configmap coredns 
Remove or comment out the line with loop
, save and exit.

Then remove the CoreDNS pods, so new ones can be created with new config:

kubectl -n kube-system delete pod -l k8s-app=kube-dns 
All should be fine after that.

Preferred Solution: Remove the loop in the DNS configuration

First, check if you are using systemd-resolved
. If you are running Ubuntu 18.04, it is probably the case.

systemctl list-unit-files | grep enabled | grep systemd-resolved 
If it is, check which resolv.conf
file your cluster is using as reference:

ps auxww | grep kubelet 
You might see a line like:

/usr/bin/kubelet ... --resolv-conf=/run/systemd/resolve/resolv.conf 
The important part is --resolv-conf
- we figure out if systemd resolv.conf is used, or not.

If it is the resolv.conf
of systemd
, do the following:

Check the content of /run/systemd/resolve/resolv.conf
to see if there is a record like:

nameserver 127.0.0.1 
If there is 127.0.0.1
, it is the one causing the loop.

To get rid of it, you should not edit that file, but check other places to make it properly generated.

Check all files under /etc/systemd/network
and if you find a record like

DNS=127.0.0.1 
delete that record. Also check /etc/systemd/resolved.conf
and do the same if needed. Make sure you have at least one or two DNS servers configured, such as

DNS=1.1.1.1 1.0.0.1 
After doing all that, restart the systemd services to put your changes into effect: systemctl restart systemd-networkd systemd-resolved

After that, verify that DNS=127.0.0.1
is no more in the resolv.conf
file:

cat /run/systemd/resolve/resolv.conf 
Finally, trigger re-creation of the DNS pods

kubectl -n kube-system delete pod -l k8s-app=kube-dns 
Summary: The solution involves getting rid of what looks like a DNS lookup loop from the host DNS configuration. Steps vary between different resolv.conf managers/implementations.

# calico not working
check logs first, look for [FATAL]
## reason
int_dataplane.go 1035: Kernel's RPF check is set to 'loose'.  This would allow endpoints to spoof their IP address.  Calico requires net.ipv4.conf.all.rp_filter to be set to 0 or 1. If you require loose RPF and you are not concerned about spoofing, this check can be disabled by setting the IgnoreLooseRPF configuration parameter to 'true'.

## solution
kubectl -n kube-system set env daemonset/calico-node FELIX_IGNORELOOSERPF=true


# rendered manifests contain a resource that already exists.
reason: namespace already exists, helm cannot install it again

# PVC status lost
"Lost" means that something deleted PVs that were bound to the PVCs. Check your audit logs what and when did that.


# grafana operator "Context deadline exceeded" for responsive target
reason: certain metrics only listen to local port (xxx:20249/metrics)
solution: change to 0.0.0.0:10249, delete to restart kube-proxy

# prometheus-operator-grafana
 error="http: proxy error: dial tcp 10.96.70.52:9090: i/o timeout"

# nothing to show in dashboard
not login as admin account
solution: create admin account

# pod has unbouind PersistentVolumeClaims
reason: no persistent volume (PV) for PVC bound to
solution: create PV without storageClassName

# cannot connect to master node / kubectl get node failed
reason: you are using dynamic ip assigned by dhcp wifi network, so ip changed and cannot connect again


# dashbaord: Error trying to reach service: 'tls: first record does not look like a TLS handshake'



# The ClusterRoleBinding "kubernetes-dashboard" is invalid: roleRef








