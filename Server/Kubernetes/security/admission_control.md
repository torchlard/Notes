# admission control
software modules modify or reject requests at object level
access contents of object being created/updated/deleted/connected, but not reads

if any admission controller module reject => request rejected
can set complex defaults for fields

MutatingAdmissionWebhook
- execute mutation by sending request ot webhook server
- matching webhook called in serial
- mutating controller may modify objects they admit
- eg. inject side cars

ValidatingAdmissionWebhook
- allow intercept, validate requests
- run in parallel
- eg. restrict resource creation

`kube-apiserver --enable-admission-plugins=NamespaceLifecycle,LimitRanger`
`kube-apiserver --disable-admission-plugins=PodNodeSelector,AlwaysDeny`


### kubernetes policy controller
provides auditing features
authorization module make possible to implement blacklist in front of RBAC
eg. whitelist/blacklist registries, no conflicting hosts for ingresses


## default controller
NamespaceLifecycle
  - enforece namespace undergoing termination no new objected created
  - prevent deleted system reserved anmespaces `default` `kube-system` `kube-public`
LimitRanger: not volate any enumerated in LimitRange
ServiceAccount: implement automation for serviceAccount
DefaultStorageClass
  - use default storage class for PersistentVolumeClaim if no requested class
  - onlt 1 storage class can mark as default 
DefaultTolerationSeconds: pods tolerate taints notready:NoExecute, uncreachable:NoExec for 5 mins
ResourceQuota
Priority
MutatingAdmissionWebhook
ValidatingAdmissionWebhook

## other controller
AlwaysPullImage: modifies every new pod to force iamge pull 
  - private image can only be used by thouse having credentials to pull
EventRateLimit: mitigate api server flooded by event requests
  - Server: event req received by api server share single bucket
  - namespace: each namespace has dedicated bucket
  - user: each user allocated bucket
  - SourceAndObject: bucket assigned by each combination of source and involved obj of event

```yaml
apiVersion: eventratelimit.admission.k8s.io/v1alpha1
king: Configuration
limits:
- type: Namespace
  qps: 50
  burst: 100
  cacheSize: 2000
- type: User
  qps: 10
  burst: 50  
```
ImagePolicyWebhook: allow backend webhook to make admission decision
