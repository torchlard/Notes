# authorization
request must include username of requester, requested action, object affected by action

```json
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "bob",
    "namespace": "projCaribou",
    "resource": "pods",
    "readonly": true
  }
}
```
bob can only read pod in namespace `projCaribou`

## attributes
user, group, extra, API
request path: to miscallaneous non-resource endpoints (eg. /api, /healthz)
api request verb: get, list, create, update, patch, watch, delete, deletecolleciton
http request verb: get, post, put, delete
resource: id/name of resource; if get/update/patch/delete, must provide resource name
subresource, namespace, api group

non-resource request: other than `/api/v1/...` or `/apis/<group>/<version>/...`

| HTTP verb | request verb                                     |
|-----------|--------------------------------------------------|
| post      | create                                           |
| get,head  | get(individual resource),list(collections),watch |
| put       | update                                           |
| patch     | patch                                            |
| delete    | delete                                           |

## check api access
check if current suer can perform given action, work for all modes
`kubectl auth can-i create deployments --namespace dev`


# modes
if multiple module configured, request only need pass one of module
- if all denied, return 403

`--authorization-mode=` ABAC/RBAC/Webhook/Node/AlwaysDeny/AlwaysAllow


## Node
special purpose, grant permissions to kubelets based on pods scheduled to run

## ABAC (attribute-based access control)
access right granted to user thorugh use of policies


## RBAC (role-based access control)
regulate based on roles of individual user to perform specific tasks

```yaml
# prepare role for binding to user/group
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:   # no namespace for cluster role
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "watch", "list"]

---

# bind roles to user/group
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subject:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader  # match name of role/cluster role wish to bind to
  apiGroup: rbac.authorization.k8s.io
```
### Role, ClusterRole
permissions are purely additive, no deny rules
role: namespace wide

cluster role: cluster wide
  - cluster-scoped resources (eg. nodes)
  - non-resource endpoint


### RoleBinding, ClusterRoleBinding
grant permission defined in role to user / set of users
holds list of subjects (users, gorups, service accounts)




## Webhook
webhook = http post that occur when something happens 
simple event notification via http post





# api server port and IPs
1. Localhost
  - testing, bootstrap
  - other component of master node (eg. scheduler) talk to api
  - default 8080, no TLS
  - request bypass authentication and authorization, handled by admission control
  - protected host access

2. Secure Port
  - use whenever possible
  - use TLS, cert, key; default 6443
  - default ip = first non localhost network interface
  - handle by authentication, authorization, admission control

at least service account token & 1 other method for user auth
`system:authenticated` group 

can integrate with other auth protocol (LDAP, SAML, kerberos, x509) 
using authenticating proxy / authentication webhook




















