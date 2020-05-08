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


# Node
special purpose, grant permissions to kubelets based on pods scheduled to run
read operations
- services, endpoints, nodes, pods
- secrets, configmaps, persistent volume claims, persistent volumes relted to pods

write operations
- nodes, node status
- pods, pod status  
- events

auth-related operations
- read/write access to certificationsigningrequests API for TLS bootstrap
- create tokenreviews, subjectaccessreviews for delegated authentication/authorization

use credential in `system:nodes` group, `system:node:<nodeName>` username
kubelets outside `system:node` wouldn't be authorized by Node auth mode


## ABAC (attribute-based access control)
access right granted to user thorugh use of policies
special resource have to be explicitly exposed via nonResourcePath property

```yaml
apiVersion: abac.authorization.kubernetes.io/v1beta1
kind: Policy
spec:
  group: "system:authenticated"
  readonly: true
  nonResourcePath: *
---
apiVersion: abac.authorization.kubernetes.io/v1beta1
kind: Policy
spec:
  user: bob
  namespace: projectCaribou
  resource: pods
  readonly: true
```

### algorithm
attribute correspond to properties of policy object
when request received, attribute determined
if at least 1 line match request attr => request authorized

permit user do anything: apiGroup,namespace,resource,nonResourcePath
permit any authenticated user: group = "system:authenticated"
permit any unauthenticated user: group = "system:unauthenticated"





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

- role: namespace wide
- cluster role: cluster wide
  - cluster-scoped resources (eg. nodes)
  - non-resource endpoint )eg. /healthz
  - namespaced resources (eg. pods) across all namespaces

### RoleBinding, ClusterRoleBinding
grant permission defined in role to user / set of users
holds list of subjects (users, gorups, service accounts)

RoleBinding: only ref role in same namespace
  - even through through RoleBinding refer to ClusterRole, still only access own namespace
ClusterRoleBinding: cluster wide

cannot change roleRef (immutable) field directly, must delete and recreate binding object again

### Agregated ClusterRoles
union rules of any ClusterRole that matches provided label selector
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monitoring-endpoints
  labels:
    rbac.example.com/aggregate-to-monitoring: "true"
    rbac.example.com/aggregate-to-edit: "true"
rules:  # rules to be added to "monitoring" role
- apiGroups: [""]    
  resources: ["services","endpoints","pods"]
  verbs: ["get","list","watch"]
---
appiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monitoring
aggregationRule:
  clusterRoleSelectors:
  - matchLabels:  # match above ClusterRole with below label
    rbac.example.com/aggregate-to-monitoring: "true"
rules: []   # rules auto filled in by controller manager
```

### subject
prefix `system:` reserved for kubernetes system use
```yaml
subjects:
- kind: User
  name: "alice@example.com"
  apiGroup: rbac.authorization.k8s.io
---
subjects:  
- kind: Group
  name: "frontend-admins"
  apiGroup: rbac.authorization.k8s.io
```
all service accounts in `qa` namespace: `name: system:serviceaccounts:qa`
all default cluster roles and rolebindings labeled with `kubernetes.io/bootstrapping=rbac-defaults`

### discovery roles
| cluster role              | cluster role binding                                | description                             |
|---------------------------|-----------------------------------------------------|-----------------------------------------|
| system:basic-user         | system:authenticated group                          | readonly to basic info about themselves |
| system:discovery          | system:authenticated group                          | readonly to api discovery endpoints     |
| system:public-info-viewer | system:authenticated, system:unauthenticated groups | readonly to non-sensitive cluster info  |

### user-facing roles
roles not `system:` prefixed are user-facing
include super-suer role (cluster-admin), granted cluster-wide using ClusterRoleBindings (cluster-status)

### privilege changes
user only create/update role if anyone true:
1. have all permissions contianed in role at same scope
2. given explicit permission to perform `escalate` verb on `roles`/`clusterroles`

### service account permission
default grant scoped permission to control-plane components, nodes, controllers
no permission to service accoutns outside `kbue-system` namespace

from most secure to least secure
1. grant role to application-specific service account (best practice)
2. grant role to default service account in namespace
3. grant role to all service accounts in a namespace
4. grant limited role to all service accounts cluster-wide (discouraged)
5. grant super-user access to all service accounts cluster-wide (discouraged)







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




















