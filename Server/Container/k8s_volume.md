# VS docker
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


















