# interpretability
what model predict, why
allow debugging, auditing ML models

# Obeservability
Testing, Monitoring (all possible permutations of full and partial failure)

# features
## immutable data
reproducible outcomes

## data lineage
multiple data sequence
find out step that data went wrong
diagnostics

## having test run feature
run data across code


# regression test


# monitoring & Testing
|                  | Web Service                                                    | Data Pipeline                                     |
|------------------|----------------------------------------------------------------|---------------------------------------------------|
| Health Check     | health check endpoint, if ping /healcheck, get 200 status code | check job has succeed                             |
| Integration Test | POST to 1 endpoint to get corresponding GET endpoint           | verify some fake data through data transformation |
| Latency          | measure average response time of API                           | measure time takes data pipeline to complete      |

## monitoring tools
prometheus
grafana
















