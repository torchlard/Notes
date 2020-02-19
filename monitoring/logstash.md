# Logstash
- log aggregator that collects data from various input sources
- executes different transformation
- enhance, ship data to various supported destination

## command
sudo /usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'

# plugin
install `logstash-plugin install logstash-input-jdbc`
list `logstash-plugin list`

# logstash-input-mongodb

```
input {
  mongodb {
    uri => "mongodb://localhost:27017/<db>"
    placeholder_db_dir => '<dir>'
    placeholder_db_name => 'xxx.db'
    collection => '<coll>'
    batch_size => 150000
  }
}
filter {
  mutate {
    rename => ["_id", "uid"]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "<collection>"
    document_type => "test"
  }
  file {
    path => "/var/log/mongodb/mongod.log"
  }
}

```









