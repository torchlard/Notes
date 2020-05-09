# Analytics
## athena
interactive query service make easy to analyze data in S3 using SQL
point data to S3, define schema
save ETL jobs

integrated with AWS Glue data catalog
=> create unified metadata repository across various services

## EMR
managed hadoop framework easy to manage dynamic scalable EC2 instances
can also run other frameworks (eg. spark, hbase, presto, flink) in EMR
  - interact with data in other AWS data sotres

handle big data use cases, eg. log analysis, web indexing, data transformations...

## CloudSearch
easy to setup, manage, scale search solution for website / application

## Elasticsearch

## Kinesis
collect, process, analyze realtime streaming data 
ingest data such as video, audio, application logs, website click streams, IOT telemetry data 

### kinesis data firehose
load streaming data into data stores and analytics tools
capture, transform, load streaming data into 
  - S3, redshift, elasticsearch, splunk
batch, compress, transform, encrypt data before loading

### kinesis data analytics
SQL, java libraries

### kinesis data streams
capture GB/s for 1000x sources
eg. website clickstreams, database event streams, financial transactions, social media feeds
  - IT logs, location tracking events

### kinesis video streams
stream video from connected devices to AWS for analysis
playback video for live and on-demand viewing

video analysis: amazon recognition video, ML library frameworks

## Redshift
fast and scalable data warehouse 
10x faster than other data warehouse by ML, massively parallel query execution, columnar storage

## QuickSight
business intelligence service 
create and publish interactive dashboards accessed from browsers / mobile devices

## data pipeline
process and move data between different AWS compute and storage services
on-premises data sources
create complex data processing workloads 

## Glue
ETL service

## Lake formation
setup secure data lake in days
centralized repository that stores all data in original form and prepared for analysis

complex tasks: 
1. load data from diverse source
2. monitor data flow
3. setup partitions
4. turn on encryption, manage keys
5. define transformation jobs, monitor operation
6. reogranize data into columnar format, configure access control
7. deduplicate redundant data

## managed streamin for kafka
use kafka api to populate data lakes, stream changes to and from db

# application integration
## step function
coordinate multiple AWS services into serverless workflows
build and update apps quickly

workflows made up of series of steps, output of 1 step as input into next
auto trigger and tracks each step

## MQ
activeMQ

## SQS (simple queue service)
fully managed mesage queue service
decouple and scale microservices, distributed systems, serverless apps
eliminate middleware oepration

standard queue: max throughput, best-effort ordering
FIFO queue: guarantee msg processed exactly once in exact order

## SNS (simple notification service)
highly available, durabl, secure pub/sub messaging service
provides topics for high-throughput, push-based, many-to-many messaging
fan out msgs to large number of subscribers endpoints for parallel processing
  - eg. SQS queue, lambda functions

## SWF (simple workflow)
help developer build, run, scale background jobs that have parallel / sequential steps
state tracker and task coordinator in cloud

# AR and VR
## sumerian
create and run VR, AR, 3D applications quickly and easily without special programming / 3D graphics

# cost management
## cost explorer
manage AWS cost and usage over time

## budgets
set custom budgets and alert you when cost / usage exceed budgeted amount
can track monthly, quarterly, yearly level

## reserved instance (RI) reporting
using RI utilization and coverage reports, can visualize RI data at aggregatelevel
inspect particular RI subscription

can set custom RI utilization target via AWS Budgets

# blockchain
create blockchain network using Hyperledger Fabric and Ethereum
manage certificate, invite new membvers to join network
replicate immutable copy of blockchain network int Amazon Quantum Ledger Database

# business applications
## Alexa for business
enable organizations and employees to use Alexa to get more work done
intelligent assistant to be more productive in meeting roomes

## WorkDocs
enterprise storage and sharing service with strong administrative controls and feedback capabilities
can comment on files, send to others for feedback
upload new versions

## WorkMail
business email and calendar service 

## Chime
communication service, work with Alexa


# Compute
## EC2
VM

## elastic container registry (ECR)
integrated with ECS
hosts images, integrate with IAM

## elastic container service (ECS)
highly scalable, performant container orchestration service that support Docker containers
allow easily run and scale containerized applications

## elastic container service for kubernetes (EKS)
deploy, manage, scale containerized applications using kubernetes

## Lightsail
easiest way to launch and manage virtual private server with AWS
include everything to jumpstart project
  - VM, SSD, data transfer, DNs management, static IP

## Batch
efficiently run thousands of batch computing jobs 
provide optimal resource based on volume and specific resource requirements of jobs 

batch plans, schedules and executes batch computing workloads across full range of compute services

## elastic beanstalk
deploy and scale web applications and services 
in Java, .NET, php, nodejs, python, ruby, go, docker
on apache,nginx,passenger,IIS

## fargate
compute engine allow run containers without having to manage servers / clusters

Fargate launch type: 
  package application in containers, specify CPU and memory
EC2 launch type:
  server-level, more granular control
  






















