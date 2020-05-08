# role
kubectl get roles|clusterroles
kubectl describe clusterroles admin

kubectl create role pod-reader --verb=get --verb=list --verb=watch --resource=pods
kubectl create clusterrole pod-reader --verb=get,list,watch --resource=pods
kubectl create rolebinding bob-admin-binding --clusterrole=admin --user=bob --namespace=acme
kubectl create clusterrolebinding root-cluster-admin-binding --clusterrole=cluster-admin --user=root

# secret
kubectl get secrets

# api group
check api groups `kubectl api-resources -o wide`

# explain usage
kubectl explain deploy











