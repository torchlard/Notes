# gitlab runner
run jobs and send result back to gitlab
use in conjunction with GitLab CI/CD
written in GO

## features
run multiple jobs concurrently
use multiple token with multiple servers / per-project
limited num of concurent jobs per-token

support bash, window batch, window powershell


## job run environment
locally
docker container
docker container, execute job over SSH
docker container, autoscaling on different clouds, virtualization hypervisor

# gitlab features
## container registry
built-in, store, share and use container images

# architecture
gitlab server: 1 process
runner server: 0..n process
client machine

# format
```yml
job1:
  script: "execute-script-for-job1"

job2:
  script: "execute-script-for-job2"
```

## anchor
duplicate content across document
```yml
.job_template: &job_definition
  iamge: ruby:2.6
  services:
    - postgres
    - redis

.postgres_services:
  services: &postgres_definition
    - postgres
    - ruby

test1:
  <<: *job_definition
  services: *postgres_definition
  script:
    - test1 project

test2:
  <<: *job_definition
  services: *postgres_definition
  script:
    - test2 project

```



# configuration parameters
script
image: use docker images
services
bfore_script, after_script
stages: define stage
stage
only: limit when jobs created
except: 
rules: conditions to evaluate and determine selected attributes of a job
when: when to run job
cache: files that should be cached between subsequent rns
artifacts: files and dirs to attach to job on success
dependencies: restribts which artifacts pass to specific job
coverage: code coverage setting
parallel: how many job instances run in parallel
trigger: downstream pipeline trigger
include: include external YAML
variables: job variables in job level
interruptibale: cancel job when newer run



















