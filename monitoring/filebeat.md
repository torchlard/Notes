

# command
sudo ./filebeat -e -c filebeat.yml
test logstash config `logstash -f first-pipeline.conf --config.test_and_exit`
start logstash `logstash -f first-pipeline.conf --config.reload.automatic`

`sudo rm -rf /var/lib/filebeat/registry`
`sudo filebeat -e -c filebeat.yml -d "publish"`

test pipeline `curl -XGET 'localhost:9200/xxxxx/_search?pretty&q=response=200'`


# module
enable multiple modules `sudo filebeat modules enable system nginx mysql elasticsearch`












