# Logstash
- log aggregator that collects data from various input sources
- executes different transformation
- enhance, ship data to various supported destination

## command
sudo /usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'

## basic structure
input -> filter -> output

# plugin
install `logstash-plugin install logstash-input-jdbc`
list `logstash-plugin list`

# input
common param =>
- add_field, codec, enable_metric
- id: auto generate id
- tags: add tag to event
- type: add type attr to event

## beats
each beat type correspond to specific scope data collection
can replace input plugin
```
beats {
  port => 5044
}
```
auto add beat,version,type in @metadata


## logstash-input-mongodb

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

# filter
## mutate
coerce: set default value of field that exists but is null
```
convert => {
  "fieldName" => "integer"
  "booleanField" => "boolean"
}
copy => { "src_field" => "dest_field"}
gsub => {
  "fieldName", "/", "_",    // replace forward slashes with underscore
  "fieldName2", "[\\?#-]", "."    // replace \?#- with dot
}
join => {"fieldName" => ","}
lowercase => ["fieldName"]
merge => {"dest_field" => "added_field"}

rename => {"hostip" => "client_ip"}
replace => {"message" => "%{source_host}: My new msg"}
split => {"fieldname" => ","}
add_field => {"foo" => "hello world, from %{host}"}

remove_field => [ "foo_%{somefield}" ]
```

## drop
enable_metric, periodic_flush
```
add_field 
remove_field => ["foo_%{somefield}"]
remove_tag, add_tag
```

## grok
combine text patterns into something that match logs

grok VS Dissect:
- grok use regular expression, better choise when structure varies between line
- dissect faster, work well when data reliably repeat


# output
common param
- codec, enable_metric, id

## elasticsearch
```
output {
  elasticsearch {
    document_id => "%{message}"
    action => "update"
    upsert => "{\"message\":\"id didn't exist\"}"
  }
}
```
support update,delete document by id using action 
action: index, delete, create, update











