# init
use around 10 min

# dedicated master node
increase cluster stability
perform cluster management task, not hold data / respond to data upload request

recommand 3 dedicated master node
1 node: no backup
2 node: no necessary quorum of node to elect new master node
3 nodes: recommended number, provide 2 backup nodes

if even number of master-eligible node, >= 7.x ignore 1 node of voting

## function
1. track all node in cluster
2. track num of indices in cluster
3. number of shards belonging to each index
4. maintain routing info for nodes in cluster
5. update cluster state after state changes, eg. create index + add/remove node
6. replicate changes to cluster state
7. monitor health

1-10: c5.large.elasticsearch
10-30: c5.xlarge.elasticsearch


# amazon congnito
offer username and password protection for kibana (optional)









