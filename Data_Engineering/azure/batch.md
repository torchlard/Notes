# intro
general purpose batch computing in cloud across many nodes
perfect fit for ETL / AI use-cases

# copy data to pool node
method depend on scope of file / application

data and application required to run entire job

1. determine scope: required for pool/job/task ?
  - pool: use pool application package / start task
  - job: job preparation task
  - task: task resource files

## pool
can use start task command line to move / install applications
every job run .exe must first be installed with .msi

## task resource files
have 5 tasks, each processing a different file
write output to blob storage


# jobs
collection of tasks
>=1 job in pool

## priority
optionally assign priority to jobs
use priority value to schedule jobs
from -1000 to 1000

## constraints
max wallclock time: terminate task if longer than that
max times retries

## auto
client application can add tasks to job 
specify job manager task: job schedule













