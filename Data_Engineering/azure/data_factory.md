1. linked service
2. data sets
- dbo.DimCustomer
- /raw/01/orders.csv

# Activities
## lookup
get value(s) from lots of places to support other activities

## ForEach
iteration of other activities, sequential / parallel
scale out

IsSequential: T/F


## Custom Activity
any custom code executed by Azure Batch compute pools

References Objects
Linked Service

=> call out to batch service

## Mapping Data Flow
Data factory -> mapping data flow -> azure databricks (spark)
similar to SSIS Data Flow

## Wrangling data flow
similar to power bi power query

## cluster configuration
via data factory azure IR




```
automation in Azure

(no scaling)
simple <-----------------------------------------------------> very complicated (need high scalability)

function/lambda                                                 Spark / Kubernetes

                        virtual machine <-- suitable for long lasting software (eg. website, handling request)
                                            not suitable for scheduled job
                    Data factory (framework)
                - azure batch
                - app function
```





