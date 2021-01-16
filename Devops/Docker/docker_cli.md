# CLI
`docker ps` see running contaienrs
`docker history` show history of an image (all changes)
`docker update` update config of containers
`docker tag` create tag to organize container images
`docker search` looks in Docker Hub
`docker save` save image to archive
`docker rmi` remove image
`docker push` user upload own custom image
`docker top` see running process

`docker-compose start|stop <service>`

show all container `docker container ls --all`

show images
`docker image ls`

stop all running images
`docker stop $(docker ps -q)`

delete none images
`docker rmi -f $(docker images -f "dangling=true" -q)`

remove exited container
`docker rm $(docker ps -aq -f "status=exited")`

# swarm cluster
group of machines that are running Docker, joined into a cluster
swarm manager 
machines can be physical/virtual, after joining swarm, referred to as nodes

run `docker swarm join` on other machines to have them join swarm as worker


# install
instll docker-ce
sudo usermod -aG docker $USER

# run service
`docker swarm init`
start running services/adjust scale `docker stack deploy -c docker-compose.yml getstartedlab`
see services `docker service ls`
take down stack `docker stack rm getstartedlab`
take down swarm `docker swarm leave --force`
`docker stack rm getstartedlab`
reset environment `eval $(docker-machine env -u)`

remove stopped container `docker container prune`
remove all container `docker rm $(docker -aq)`

## example
- run mariadb
docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=123456 -d mariadb:latest

docker stop e4a8800b0d71
docker container start e4a8800b0d71

OR

1. write stack.yml
2. docker-compose -f stack.yml up
3. enter container shell `docker exec -it mariadb_db_1 bash`

mariadb:
(GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY PASSWORD '123456' WITH GRANT OPTION)
(show grant for user@localhost)

mysql 8.0:
(CREATE USER 'root'@'%' IDENTIFIED BY 'root';
 mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;)

## docker autostart
if set `restart: always` in docker-compose.yml, then will auto start

## snapshot
`docker commit <id> <image name>:<version>`

`docker save <image> > xxx.tar`



# docker-compose
docker-compose -f mysql2.yml up -d --force-recreate --remove-orphans



