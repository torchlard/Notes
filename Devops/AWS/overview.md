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
  - server-level, more granular control
  - decide server type, applications, how many containers

## lambda
run code without manging servers

## serverless application repository
quickly deploy code samples, components, complete application for common use case

## AWS outposts
native AWS services, infrastructure, operating models to any data center
use same API, tools, hardware, functionality

## VMWare cloud on AWS
integrated cloud offering jointly developed by AWS and VMWare
  - seamlessly migrate and extend on-premises VMware vSphere-based environments on EC2


# Customer Engagement
## Amazon Connect
self-service contact center service to deliver customer service

## SES (simple email service)

# Database
## Aurora
mysql and PostgreSQL compatible 
5x faster than standard mysql

## RDS (relational database service)

## RDS on VMware
deploy managed DB on-premises VMWare environment

## DynamoDB
key-value and document database

## ElastiCache
in-memory cache in cloud
support redis and memcached engine

## Neptune
graph database service

## Quantum Ledger Database
transparent, immutable and cryptographically verifiable transaction log owned by central trusted authority

## Timestream
time series database 
easy to store and analyze trillions of events per day at 1/10th cost of relational db

## DocumentDB
mongoDB compatible document database
implements mongoDB 3.6 API

# Desktop and App Streaming
## WorkSpaces
cloud desktop service for Windows / Linux
pay hourly / monthly

## AppStream 2.0
centraly manage desktop applications and securely deliver them to any computer


# Developer Tools
## CodeCommit
source control service hosts Git-based repository

## CodeBuild
build service that compiles source code, run tests, produces software packages ready to deploy

## CodeDeploy
automate code deployments to any instance

## CodePipeline
continuous delivery service that automate release pipeline 
for fast and reliable app and infrastructure updates

## CodeStar
develop, build and deploy applications on AWS

## Corretto
multiplatform, production ready distribution of OpenJDK

## Cloud9
cloud-based IDE that write,run,debug code in browser

## X-Ray
help analyze and debug distributed applicationss in production or under development

# Game Tech
## GameLift
deploy, operate and scale dedicated game servers for session-based multiplayer games

## Lumberyard
free, cross-platform, 3D gfame engine

# IoT
## IoT Core
connect devices easily and securely interact with cloud applications and other devices
support billions of devices and trillions of messages

## FreeRTOS
OS for microcontrollers
small, low-power edge devies

## IoT Greengrass
extends AWS to devices that they can act locally on data they generate
still using cloud for management, analytics and durable storage

connected devices can run AWS Lambda

## IoT 1-Click
enable simple devices to trigger AWS Lambda

## IoT Analytics
run and operationalize sophisticated analytics on massive volumes of IoT data

# Machine Learning
## SageMaker
enable developers and data scientists to build, train and deploy ML models at any scale

## SageMaker Ground Truth
help build highly accurate training dataset of ML quickly
easy access to public and private human labeler 
provide built-in workflows and interfaces for common labeling tasks

## Comprehend
natural language processing service 

## Lex
building conversational interface into any application using voice and text

## Poly
service that turns text into lifelike speech

## Rekognition
add image analysis to applications

## Translate
neural machine translation service

## Transcribe 
automatic speech recognition

## Elastic Inference
attach low-cost GPU-powered acceleration to EC2 and SageMaker instance

## Forecast
use ML to deliver highly accurate forecast

## Textract
extract text and data from scanned documents
beyond OCR, also identify contents of fileds in forms and innformation stored in tables

## Personalize
create individualized recommendations for customers 

## Deep Learning AMIs
provide ML practitioners and researchers with infrastructure and tools to accelerate deep learning in cloud

## DeepLens
tutorials, code, pre-trained models to expand deep learning skills

## DeepRacer
1/18th scale race car for you get started with reinforcement learning (RL)

## MXNet on AWS
## TensorFlow on AWS
## Inferentia
ML inference chip 


# Management and Governance
## CloudWatch
monitor and management service 

## Auto Scaling
monitors applications, auto ajust capacity

## Control Tower
auto setup baseline environment / landing zone
well-architected multi-account AWS environment

work with thousands of enterprise customers to create secure environment
create multiple accoutns for teams to work independently

## Systems Manager
give visibility and control of infrastructure on AWS
provide unified user interface to view operational data from multiple AWS services
automate operational tasks across AWS resources

## CloudFormation
create and manage collection of related AWS resources

## CloudTrail
record AWS API calls for account and delivers log files to you

## Config
resource inventory, configuration history
configuration change notification


# Networking
## VPC (Virtual Private Cloud)
locally isolated section of AWS cloud

## CloudFront
CDN service

## Route 53
cloud DNS service

## PrivateLink
data share with cloud-based application
eliminate exposure of data to public internet

## Direct Connect
establish dedicated network conenction from your premises to AWS

## Global Accelerator
improves availability and performance of applications to global users

## API gateway
create, publish, maintain, monitor and secure APIs at any scale
create API as front door for applications to access data, business logic or functionality from backend service

## Transit Gateway
ensure customers connect VPC and on-premises networks to single gateway
scale networks across multiple accounts and VPCs to keep growth

## App Mesh
monitor and control micoservices running on AWS
standardize how microservices communicate, giveing end-to-end visibility
ensure high-availability for your applications

configures each microservice to export monitoring data and 
implements consistent communication control logic across application

## Cloud Map
cloud resource discovery service
define custom names for application resources, maintain updated location of dynamically changing resources

## Elastic Load Balancing (ELB)
automatically distribute incoming application traffic across multiple targets
  - EC2, containers, IP addresses

### application load balancer
Layer7, balance HTTP(s) traffic

### network load balancer
Layer4, balance TCP traffic where extreme performance required
handle sudden and volatile traffic patterns

### Classic Load Balancer
balance across multiple EC2, operate at both Layer 7 and 4

# Security
## Security Hub
comprehensive view of high-priority security alerts and compliance status across AWS accounts
firewalls, endpoint protection
single place that aggregates, organizes and prioritizes security alerts / findings from multiple AWS services

## Cloud Directory
build flexible, cloud-native directories for organizing hierarchies of data along multiple dimensions
eg. organizational charts, course catalog, device registries
traditional LDAP-based directories limit to single hierarchy => span multiple dimension
eg. organizational chart navigated through separate hierarchies for reporting structure, location and cost center 

## Identity and Access Management (IAM)
control access to services and resources

## GuardDuty
threat detection servie monitor for malicious / unauthorized behavior 

## Inspector
automated security assessment service

## Macie
use ML to discover, classify and protect sensitive data

## Artifact
on-demand access to AWS security and compliance reports and select online agreements

## Certifiacate Manager
provision, manage and deploy SSL/TLS certificates for use with AWS services and internal connected resources

## CloudHSM
cloud-based hardware security module

## Directory Servie
for Microsoft Active Directory

## Firewall Manager

## Single Sign-On
centrally amnage SSO acceess to accounts and business applications

## WAF
web application firewall


# Storage
## S3 (simple storage service)
object storage service that offers scalability, data availability, security and performance

## Elastic Block Store (EBS)
persistent block storage volumes for use with EC2

## Elastic File System (EFS)
simple, scalable, elastic file system for Linux-based workloads
use with Cloud services and resource
scale on demand to PB

## FSx for Lustre
optimized for compute-intensive workloads

## FSx for Windows File Server
native Windows fielsystem, move Windows-based applications that require file storage to AWS

## S3 Glacier
extremely low-cost storage service

## Storage Gateway
hybrid storage service enables on-premises applications seamlessly use cloud storage










