# intro
version control, managementm, udpate yaml config of k8s
package all yaml files into chart collection
  - use arguments to manage and set these yaml files

chart: helm package
  - contains all resource definitions necessary to run app/servie
repository: place share charts
release: instance of chart running in k8s cluster
  - 1 chart can install many times into same cluster
  - each time installed new release created

# command
## search
show all `helm search hub`
search wordpress `helm search wordpress`
show already added `helm search repo`

## install
install mariadb release named happy-panda `helm install happy-panda stable/mariadb`
helm uninstall happy-panda


# config

```bsh
echo '{mariadbUser: user0, mariadbDatabase: user0db}' > config.yaml
helm install -f config.yaml stable/mariadb --generate-name
```
--set name=value    `name: value`
--set a=b,c=d   
```yaml
a: b
c: d
```
--set outer.inner=value
--set name={a, b, c}
```yaml
name: 
  - a
  - b
  - c
```
--set servers[0].port=80,servers[0].host=example
--set nodeSelector."kubernetes\.io/role"=master

# flow
helm init
helm install stable/wordpress

# calico
enable networking and entwork policy in k8s cluster across cloud


# chart
## file structure
```
wordpress/
  Chart.yaml            # info abouit chart
  values.yaml           # default config value
  values.schema.json    # json schema imposing structure on values.yaml
  charts/               # directory contain any charts upon which this chart depends
  crds/                 # custom resource definitions
  templates/
```
## template 
written in Go template language







