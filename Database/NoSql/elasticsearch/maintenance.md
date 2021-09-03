# pinpoint problematic shards
curl localhost:9200/_cluster/health?wait_for_status=yellow&timeout=50s

curl -XGET localhost:9200/_cat/shards?h=index,shard,prirep,state,unassigned.reason| grep UNASSIGNED

# get more info about shard allocation issue
curl -XGET localhost:9200/_cluster/allocation/explain?pretty

# low disk
curl localhost:9200/_cat/allocation?v


# delete replicas
curl -H "Content-Type: application/json" -XPUT "http://localhost:9200/metrics-*/_settings" -d '{"index":{"number_of_replicas":0}}'














