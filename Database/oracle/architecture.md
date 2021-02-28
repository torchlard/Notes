# grid architecture

virtualization: 
  - resources pooled together by type made available to consumer
  - aviod hard-coded resources

provisioning: 
  - when consumer request resource through virtualization layer
  - specific resource identified to fulfill request
  - allocate to consumer

## application grid
encodings of business logic and process flow within application software

## information grid
grid computing treats information holistically as a resource
similar to infrastructure and applications resources


# DBMS
## elements
kernel code: manage memory and storage
repository of metadata: data dictionary
query language: enables applications to access data

# operations
## logical
specifies what content is required

## physical 
determines how things should be done
eg. determine to use index to find requested rows

# schema
schema: collection of logical data structure


# Terms
## Database
refers to data files of 
- multitenant contianer database (CDB)
- pluggable database (PDB)
- application container

## Database instance
named set of memory structure that manage database files
consist of shared memory area, called system global area (SGA)

# Multitenant architecture
every Oracle database must contain / can be contained by another database

## application container
optional, user-created container within CDB

SaaS deployment can use multiple application PDB, each for separate customer
share application metadata and data


# Multitier architecture
one or more application servers take part
SOA service implemented as Web Service
  - XML-based standard (WSDL, SOAP)

# Oracle Net Services Architecture
Oracle NEt maintains network session from client to db server









