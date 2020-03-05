# config
```yaml
global:
rules_files:

scrape_config:
  job_name
  metrics_path
  honor_labels: 
    control how handle conflicts between labels that already present in scraped data and labl attach server-side
  honor_timestamp: <boolean>
  params: optional http url parameters
  basic_auth:
    username
    password
    password_file

  (azure_sd_configs, ec2_sd_config, ...)
  static_config:
    # list of labels statically configured for this job
    

alerting:
  alert_relabel_configs
  alertmanagers

remote_write:
remote_read:

```










