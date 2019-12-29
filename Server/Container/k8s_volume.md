# k8s volume VS docker volume
docker volume no explicit lifetime, volume driver limited functionality
k8s volume has explict lifetime, same as pod that encloses it
- volume outlives any container run within pod
- data preserved across container restarts

when Pod vanish, volume disappear
Pod can use any number of types of volumes simultaneously
at core volume just directory

docker image at root of fs hierarchy, any volume mounted at specified paths within image

## awsElasticBlockStore
mounts AWS EBS Volume into pod
when pod removed, content of EBS preserved and volume merely unmounted
EBS can pre-populated with data, data can transfer between pods

nodes that pod running must be EC2
instances must in same region and availability-zone as EBS 
EBS only support single EC2 instance mounting a volume
  
```yaml
spec:
  volumes:
  - name: test-volume
  awsElasticBolckStore:
    volumeID: <volume-id>
    fsType: ext4
```

## configMap
inject configuration data into Pods

```yaml
spec:
  volumes:
  - name: config-vol
    configMap:
      name: log-config
      items:
      - key: log_level
        path: log_level
```
must create configMap before use

## emptyDir
first created when Pod assigned to a Node
exists as long as Pod is running on that node

initially empty, containers in Pod can all read/write same files in emptyDir
  - volume can be mounted at same/different paths in each container

container crashing NOT remove Pod from node

### use case
- scratch spaces, eg. disk-based merge sort
- checkpointing long computation for recovery from crashes
- holding files that container fetch while webserver container serves data

```yaml
volumes:
  - name: cache-volume
    emptyDir: {}
```

## hostPath
mount file/directory from host node's filesystem into Pod

uses:
- running container that need access docker internals
- cAdvisor in container
- allow Pod specify whether given hostPAth should exist prior Pod running

### type
(empty string): no checks before mounting hostPath volume
DirectoryOrCreate: if nothing in given path, empty dir created, set 0755, group|ownership as kubelet
FileOrCreate: create empty file if not exist, set 0644, kubelet same group|ownership
Directory, File, Socekt, CharDevice, BlockDevice: must exist

Pods with identical config may behave differently on different nodes
   - due to different files on nodes
resource-aware scheduling not count resource used by hostPath
file/dir created only writable by root

```yaml
volumes:
- name: test-volume
  hostPath:
    path: /data   # dir on host
    type: Directory
```

## local
represent mounted local storage device, eg. disk, partition, directory

Local volume only used as statically created PersistentVolume, no dynamic provisioning
used in durable and portable manner without manually scheduling (VS hostPAth)

if node unhealthy, local volume inaccessible
```yaml
spec:
  capacity:
    storage: 100Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /mnt/disks/ssd1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpression:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - example-node
```

## nfs
allow exisiting network file system share mount in Pod

## persistentVolumeClaim
used to mount PersistentVolume into Pod
way for user to 'claim' durable storage without knowing details particular cloud environment

abstraction on cloud storage details, user need not know details

## projected
map several existing volume sources into same directory

types can be projected: secret, downwardAPI, configMap, serviceAccountToken
  - need in same namespace as Pod

## portworxVolume
elastic block storage layer that runs hyperconverged with k8s
fingerprints storage in server, tiers based on capabilities, aggregates capacity across multiple servers
run in-guest in VM / on bare metal Linux nodes

dynamically created through k8s / pre-provisioned and referenced inside Pod

```yaml
spec:
  volumes:
  - name: pxvol
  portworxVolume:
    volumeID: "pxvol"
    fsType: "<fs-type>"
```

## secret
used to pass sensitive information, eg. password, to Pod
store secret in k8s, mount as files for use by Pods without coupling to k8s directly

secret backed by tmpfs, never written to non-volatile storage

## subPath
share one volume for multiple users in single Pod
`volumeMounts.subPath` specify subpath inside referenced volume instead of its root

LAMP
```yaml
spec:
  contaienrs:
  - name: mysql
    image: mysql
    env:
    - name: MYSQL_ROOT_PASSWORD
      value: "rootpassed"
    volumeMounts:
    - mountPath: /var/lib/mysql
      name: site-data
      subPath: mysql
  - name: php
    image: php:7.0-apache
    volumeMounts:
    - mountPath: /var/www/html
      name: site-data
      subPath: html
  volumes:
  - name: site-data
    persistentVolumeClaim:
      claimName: my-lamp-site-data
```

# Resources
storage media of emptyDir determined by medium of fs holding kubelet root dir `/var/lib/kubelet`

no limit how much space emptyDir/hostPath volume can consume
  - no isolation between containers / pods

emptyDir, hostPath can request certain space using resource specification, select media type

# Out-of-Tree volume plugins
## CSI (container storage interface)
once CSI compatible volume driver deployed, can use `csi` type to attach, mount volume

raw block volume support
allow csi volume directly embedded in Pod spec instead of perisstentVolume

## FlexVolume
out-of-tree plugin interface, use exec-bassed model to interface with drivers
FlexVolume driver binaries must installed in pre-defined volume plugin path on each node


# Mount propagation
share volume mounted by contaienr to other contaienr in same Pod

- None
- HostToContaienr
- Bidirectional

in docekr systemd service `MountFlags=shared`
then `sudo systemctl restart docker`



# Persistence Volume
abstract detils how storage provided from, how it is consumed

## PersistentVolume (PV)
resource ~ node
storage in cluster provisioned by admin / dynamically provisioned using Storage Classes
lifecycle independent of individual Pod that use PV


## lifecycle
### static
cluster admin creates a number of PV

### dynamic
no static PV created, cluster try dynamically provision volume specially for the PVC
- PVC request a storage class
- admin have created & configured class 

## binding
control loop in master watches for new PVCs, find matching PV (if possible), bind them together
  - binds are exclusive, 1-1 mapping

if deletes PVC, PVC only removed when PVC no longer used by any pod
if deletes PV, PV only removed when PV no longer bound to a PVC

## Reclaiming
when user done with volume, delete PVC object that allow resource to reclaim

### retain
allow manual reclamation of resource

after delete, previous data remains on volume, need:
1. delte PersistentVolume, associated storage asset (eg. EBS,GCE) still exists
2. manually clean up data on associated storage aasets 
3. manually delete associated storage aaset

### delete
remove both PV object and associated storage asset
Volume that dynamically provisioned inherit reclaim policy of storage class

### recycle
perform basic scrub (rm -rf /vol/*) on volume, make it available again for new claim

## Access mode
by 1 node: ReadWriteOnce
by many node: ReadOnlyMany, ReadWriteMany

## phase
available, bound, released, failed



## PersistentVolumeClaim (PVC)
a request for storage by user, ~Pod
- Pod consume node resource, PVC consume PV resource
- Pod request some CPU and memory, Claims request some size and access mode

```yaml
kind: PersistentVolumeClaim
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 8Gi
  storageClassName: slow
  selector:
    matchLabels:
      release: "stable"
    matchExpression:
      - {key: environment, operator: In, values: [dev]}
```

### claim as volume
```yaml
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: myclaim
```

# Volume Snapshot
CSI volume plugin only

# Volume Cloning
CSI olume plugin only


# Writing portable config
- include PersistentVolumeClaim objects
- Don't include PV in config
- give user option providing storage class name when instantiating template
  - if provide class name, put in `persistentVolumeClaim.storageClassName` 
- watch PVC that not getting bound after some time














