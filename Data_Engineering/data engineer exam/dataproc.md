# streaming and batch data pipeline
both operate at same time

easy: one at a time element ingest from single source
hard: combining elements aggregate
really hard: process data from diff source, streaming, out of order composite

# Dataproc
managed apache hadoop/ spark service
more devops

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

HDFS -> google cloud storage
hive -> BigQuery
HBase -> Bigtable

## best prractice
keep your data close to your cluster
- same region
larger persistent disk, SSD over HDD
Allocate more VM
- use preemptible VM

need >= 2 standard worker nodes to run preemptible workers



















