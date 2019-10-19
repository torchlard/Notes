# eureka
rest based service primarily used in AWS 
locate service for load balance and middle-tier servers
=> Eureka Server

Eureka client: java based client component
- interaction with service much easier
- built-in load balancer (round-robin load balance)

## objective
unlike traditionnal load balancer with many IP address and host name
- sophisticate in register & deregister servers on fly
- miss mid-tier load balancer

## VS elastic load balance (ELB)
elb
- for edge services exposed to end-user traffic
- proxy based load balancing at instance/server/host level
- 









