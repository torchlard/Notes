# intro
show `docker network ls`

3 networks built into docker (bridge, none, host)
connect to network `--network`

# network driver
bridge: default, applicaiton run in standalone container need to communicate

host: for standalone container, remove network isolation container<->host

overlay: connect multiple docker daemons together, enable swarm services
  - faciliate comm swarm service & standalone container
  - OR 2 standalone container on different Docker daemons
  - no need OS-level routing between container

macvlan: allow assign MAC address to container => appear as physical device
  - best for legacy application physical network

none: disable all networking

## bridge
link layer device

user-defined bridge VS default bridge
1. user defined bridge better isolation, interoperability between container
  - expose all ports to each other, no ports to outside
2. user-defined bridge auto DNS resolution between container
  - default bridge can only access each other by IP

create network
`docker create --name=my-nginx --network my-net --publish 8080:80 nginx:latest`

connect running container to existing user-defined bridge
`docker network connect my-net my-nginx`

disconnect `docker network disconnect my-net my-nginx`

```
docker network create --driver bridge alpine-net
docker run -dit --name alpine1 --network alpine-net alpine ash
docker run -dit --name alpine2 --network alpine-net alpine ash
docker run -dit --name alpine3 --network alpine-net alpine ash

docker network inspect bridge
docker network inspect alpine-net
docker container attach alpine1

ping -c 2 alpine1
ping -c 2 alpine2
ping -c 2 alpine3
```














