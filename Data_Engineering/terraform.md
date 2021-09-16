# intro
automate and manage infrastructure

declarative, open source

1. preparing infrastructure
need to do in correct order

2. deploying applications

# infrastructure as code
automate: provisioning, configuring, managing infrastructure

## ansible VS terraform
ansible:
mainly config tool, more mature

terraform:
mainly infrastructure provisioning tool,
relatively new, more advanced in orchestration


# manage
create infrastructure
changes to infrastructure

## replicate infrastructure
dev, prod environment

can copy code


# terraform architecture
1. core
tf-config: what to create
state: current state of setup

2. state
current state VS desired state (config file)
- plan: what needs to be created/updated/destroyed

## providers
IaaS: AWS, Azure 
PaaS: Kubernetes
SaaS: Fastly

> 100 providers, > 1000 resources

# command
refersh: query infrastructure provider to get current state
plan: create an execution plan
apply: execute the plan
destroy: destroy resources / infrastructure

# main purpose
declaring resources, represent infrastructure objects


# syntax
```
resource "aws_vpc" "main" {
  cidr_block = var.base_cidr_block
}

<block type> "<block label>" "<block label>" {
  <identifier> = <expression>
}
```

## input variable
param for Terraform module
customized without altering module's own source code

```tf
variable "a" {
  type = string|number|bool
  default = 
}
```













