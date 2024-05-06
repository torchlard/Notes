# data center
Multi-region: Asia, Europe, Africa, North America
region: asia-east1, europe-west2
zones: asia-east1-a

# resource
## global
preconfigured disk image, disk snapshot, network
Cloud interconnects: highly available on-premises network
Routes: create complex networking scenarios

## regional
static external IP address

## zone
VM instances, machine types, persistent disks
GPU, cloud TPU

deploy application across multiple zones and regions

## cluster
all google cloud hardware organized into cluster
set of compute, network, storage resources

zone to cluster mapping:
select unique cluster for each zone in region (default cluster for zonal resources)
1 cluster -> 1 zone, 1 zone -> many clusters
align mappings between projects using VPC

# project
organizing entity for what you're building
setting, permissions, metadata that describe application

project cannot access another project unless Shared VPC / VPC network peering
each project associated with one billing account, multiple project can use same billing

project as namespace, every resource have unique name

# services
## common dependency
identity data plane for auth and authroize
logging, metadta storage, workflow
Google cloud API on DNS, global 
configuration of global resource: IAM, global firewall, pub/sub topics












