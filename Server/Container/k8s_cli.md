# kubectl
get resources `kubectl get xxx` 
show detailed info of resource `kubectl describe xxx`
print logs from container in pod `kubectl logs xxx`
execute command on container in pod `kubectl exec xxx`

run bash
`kubectl exec -it <pod_name> bash`


apply label `kubectl label pod <pod-name> app=v1`
get pods of label app=v1 `kubectl get pods -l app=v1`

`kubectl delete service -l app=v1`

create serice at runtime `--expose`
expose service
`kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080`

scale `kubectl scale deployments/kubernetes-bootcamp --replicas=2 `

access service `curl $(minikube ip):<node-ip>`


`kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=<new>`
`kubectl rollout status|undo deployments/kubernetes-bootcamp`










