# access to api
access api using kubectl, client library, making REST requests
[user,pod] -> authentication -> authorization -> admission control -> resources

api seraver on port 6443
presents a self signed certificate, $USER/.kube/config contains root certificate
- used in place of system default root cert

if cluster has multiple user, creator need share cert with other users

# authentication
must design at start of init api server, cannot change via api
config run multiple authenticator modules
client cert, password, plain token, bootstrap token, JWT token
- each one tried in sequence until one succeed

if request cannot auth, rejected with 401; else auth as specific username

## user
service account: managed by k8s
  - bound to specific namespace
  - create by API server / manual API call 
  - tied to set of credentials `Secrets`
  - auto mount into pods, gives each pod credentials for talking to api server
  
normal user: managed by outside, independent service
  - cannot added to cluster through API call

## strategy
use client cert, bearer token, auth proxy, http basic auth
- username
- uid: identify end user, more unique
- groups: group users
- extra fields: additional info

## X509 client cert
file must >= 1 certificate authorities to validate client cert 
CA can indicate suer's group membership by organization fields

generate certificate for username "jbeda" belonging to groups "app1" and "app2"
`openssl req -new -key jbeda.pem -out jbeda-csr.pem -subj "/CN=jbeda/0=app1/0=app2`

`component: common Name , organizations`
controller manager: system:kube-controller-manager
scheduler: system:kube-scheduler
kube proxy: system:kube-proxy
kubelet: system:node:${hostname} , system:nodes


## static token file
read bearer token ; csv file
`token,user,uid,"group1,group2,group3"`
api server expects sth like `Authorization: Bearer 31ada4fd-adec-460c-809a-9e56ceb75269`

## Bootstrap token
streamlined bootstraping for new clusters, dynamically-managed Bearer token
token stored as Secrets in `kube-system` namespace
tokenCleaner controller that deletes bootstrap tokens as they expire

format `[a-z0-9]{6}.[a-z0-9]{16}` as `token id.token secret`
`Authorization: Bearer 781292.db7bc3a58fc5f07e`

authenticator auth as `system:bootstrap:<Token ID>` included in `system:bootstrappers` group

## static password file
basic auth credentials last indefinitely, password cannot change without restarting API server
`password,user,uid,"group1,group2,group3"`

## service account token
kubectl create serviceaccount jenkins
kubectl get serviceaccounts jenkins -o yaml
kubectl get secret jenkins-token-1yvwg -o yaml

auth with username
`system:serviceaccount:(NAMESPACE):(SERVICEACCOUNT)` assigned to groups
`system:serviceaccounts` `system:serviceaccounts:(NAMESPACE)`

## HA consideration
multiple api server fronted with load balancer
each master has own certificate
load balancer's DNS name, IP address should be part of cert's subject alternative name (SAN) field

## kubelet client certificate
each kubelet on cluster has own identity
enable node authorizer and node restrictin admission
limit kubelet read write access to resources related to node itself, pods bound to node

## kubelet cert boostrap
kubelet need client cert to access api server
instead of admin generate cert foreach kubelet, kubelet request cert as it starts up
build on top of cert api, bootstrap token authenticator





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
support multiple auth mode: ABAC mode, RBAC mode, Webhook mode
if multiple module configured, request only need pass one of module
- if all denied, return 403

## with RBAC
default deny all

# admission control
software modules modify or reject requests
access contents of object being created/updated/deleted/connected, but not reads

if any admission controller module reject => request rejected
can set complex defaults for fields

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




















