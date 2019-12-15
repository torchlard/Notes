virtual private cloud (VPC)

# security group
inbound: protect network against incoming traffic from internet
outbound: filter outgoing traffic from own server (rarely setup)

# connect to rds 
## in same VPC
1. create VPC security group for DB in
2. create VPC security group for EC2 instances
  - eg. allow access to EC2 via VPC's routing table
3. create custom rule that allow connection from security group for EC2

# centos
default username: `centos`



















