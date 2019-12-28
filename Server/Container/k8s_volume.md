# VS docker
docker volume no explicit lifetime, volume driver limited functionality
k8s volume has explict lifetime, same as pod that encloses it
- volume outlives any container run within pod
- data preserved across container restarts

when Pod vanish, volume disappear
Pod can use any number of types of volumes simultaneously
at core volume just directory



















