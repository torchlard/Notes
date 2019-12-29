# minikube
`minikube start`

# kubectl
get resources `kubectl get xxx [-o wide]` 
show detailed info of resource `kubectl describe xxx`
print logs from container in pod `kubectl logs xxx`
execute command on container in pod `kubectl exec xxx`

run bash `kubectl exec -it <pod_name> bash`

## service
apply label `kubectl label pod <pod-name> app=v1`
get pods of label app=v1 `kubectl get pods -l app=v1`
create service at runtime `--expose`
expose service
`kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080`
delete service with certain label `kubectl delete service -l app=v1`

access service `curl $(minikube ip):<node-ip>`

## image
`kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=<new>`
rollback `kubectl rollout status|undo deployments/kubernetes-bootcamp`

## replica
scale `kubectl scale deployments/kubernetes-bootcamp --replicas=2`
terminate all replica `kubectl scale deployments/kubernetes-bootcamp --replicas=0`









