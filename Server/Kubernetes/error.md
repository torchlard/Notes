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





