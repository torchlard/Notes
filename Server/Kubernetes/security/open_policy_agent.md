# open policy agent
use general policy engine to implement custom logic
just validating json data
```
request -> Service --policy query  -->  OPA --- policy(Rego)
                  <--policy decision--      --- Data (json)
```
# initiative
allow user to access all namespace except `kube-system`, since infrastructure deploy in `kube-system`
enforce run PodSecurityPolicy, not allow user run as root / directly mount hostPath volume

1. RBAC autom defined authorization, use RoleBinding
problem: many special rules, not good for future maintenance
  - should switch form whitelist to blacklist mmodel



