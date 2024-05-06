# Cloud audit log
answer who did what, where, when

## admin activity audit log
- API calls that read config/metadata of resource
- user driven API that modify config, metadata of resource

always written, cannot configure, exclude, disable

## system event audit log
Google Cloud actions that modify config of resource, not user action
always written

## policy denied audit log
Google Cloud service denied access to user / service account because of security policy violation

## data access audit log
API call, user driven API create,modify,read user-provided resource
bigquery data access log is disabled by defautl (too large)

# Log entry strucutre
Log name:  projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity
ip address:
    - public ipv4/ipv6 
    - private: google's internal production network
    - Compute engine VM with external IP
    - Compute engine VM without external IP: gce-internal-ip

# storing and routing audit log
use log buckets as container to store and organize logs data
_Required: store admin activity, system event
_Default: store enabled data access, policy denied

# Sinks
control how cloud Logging routes logs



