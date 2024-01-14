# streaming and batch data pipeline
both operate at same time

easy: one at a time element ingest from single source
hard: combining elements aggregate
really hard: process data from diff source, streaming, out of order composite

managed apache hadoop/ spark service
more devops
cluster-based infrastructure

## IAM
project level only
Editor, viewer, 
worker: assigned to service accounts
    - read/write GCS, write to cloud logging

## create cluster
select name, zone

initialization action

## network
SOCKS proxy
allow necessary web port through firewall

## optimization
create cluster -> write output -> delete cluster
-> view output in bucket(cloud storage) / stackdriver

not on 24 hours (not on-premise)

## best practice
keep your data close to your cluster
- same region
larger persistent disk, SSD over HDD
Allocate more VM
- use preemptible VM

need >= 2 standard worker nodes to run preemptible workers

# preemptible VM
significantly cheap, short-lived compute instance 
- for batch and fault-tolerant
- only for secondary workers
- for fault tolerant jobs
- increase max attempt of master 


# FAQ
dataproc cluster isolated from public internet, not have any public IP address
- use --no-address flag, make sure private google access enabled for the subnet

- must have max 2:! preemptible to standard workers
