# Webhook
webhook = http post that occur when something happens 
simple event notification via http post

```yaml
apiVersion: v1
kind: Config
# refer to remote service
clusters:
- name: name-of-remote-authz-service
  cluster:
    certificate-authority: /path/to/ca.pem  # verify remote service
    server: https://authz.example.com/authorize   # must be https
# api server's webhook config
users:
- name: name-of-api-server
  user:
    client-certificate: /path/to/cert.pem # for webhook plugin to use
    client-key: /path/to/key.pem  # key matching cert
current-context: webhook
contexts:
- context:
    cluster: name-of-remote-authz-service    
    user: name-of-api-server
  name: webhook

```

request payloads
```json
{
  "apiVersion": "authorization.k8s.io/v1beta1",
  "kind": "SubjectAccessRevice",
  "spec": {
    "resourceAttributes": {
      "namespace": "kittensandponies",
      "verb": "get",
      "group": "unicorn.example.org",
      "resource": "pods"
    },
    "user": "jane",
    "group": [
      "group1",
      "group2"
    ]
  }
}
```
response
```json
{
  "apiVersion": "authorization.k8s.io/v1beta1",
  "kind": "SubjectAccessReview",
  "status": {
    "allowed": true
  }
}
--- //OR
{
  "apiVersion": "authorization.k8s.io/v1beta1",
  "kind": "SubjectAccessReview",
  "status": {
    "allowed": false,
    "denied": true,
    "reason": "user does not have read access to namespace"
  }
}
```












