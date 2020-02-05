# user authentication
auth handled by service realm 
can integrate with external user management systems such as LDAP, active directory

builin realm: native, ldap, active_directory, pki, file, saml
depending on realms config, must attach user credentials to requests sent to ES
- eg. basic auth header for username,pwd 
  
token, api key service

## built in user
elastic: superuser
kibana: connect, communicate with elasticsearch
logstash_system: for logstash to store monitoring info
beats_system: for beats to store monitoring info
apm_system
remote_monitoring_user: metricbeat collect and store monitoring info 

## how to work
builtin user stored in `.security` index
if built-in user disabled / password chagned, auto reflect on each node in cluster
disable native realm not affect built-in user
can disabled individually

reset builtin user password `bin/elasticsearch-setup-passwords interactive`

## license
security not available for Basic license, cannot use nodejs


















