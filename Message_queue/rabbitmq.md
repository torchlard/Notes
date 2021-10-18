# tool
rabbitmqctl: manage rabbitmq nodes
rabbitmq-diagnostics: diagnose, monitor and health check tools
rabbitmq-plugins: manage plugins
rabbitmq-upgrade: installation upgrade tools
rabbitmq-queues
rabbitmq-server: start rabbitmq node

## rabbitmqctl
rabbitmqctl uses the erlang distribution, needs the same erlang.cookie installed on the remove machine

# clustering
## enable
rabbitmq-plugins --offline enable rabbitmq_peer_discovery_k8s

## hostname resolution
address each other using domain name
  - DNS record, /etc/hosts

## port access
nodes bind to ports in order to accept client and CLI tool connections

4369: epmd, discovery daemon
5672,5671: AMQP with/without TLS
25672: inter-node and CLI tools communication, should not publicly exposed
35672-35682: CLI tools
15672: HTTP API, rabbitmqadmin
61613,61614: STOMP client
1883,8883: MQTT clients
15692: prometheus if plugin enabled

## replicated
all data/state for operation of broker replicated across all nodes

all nodes are equal peers, no special nodes
CLI tool, HTTP API can execute against any node

## cookie
use cookie to determine whether allowed to communicate with each other
every cluster node must have same cookie

# Quorum queue
implement durable, replicated FIFO queue based on Raft consensus algorithm

for topologies where queues exist for long time, and critical to certain aspects of ssytem operation
fault tolerance, data safety > low latency, advanced queue feature

publishers should use publisher confirms how clients can interact with quorum queue concensus system
more replicas quorum queue has, lower throughput will be

## when not use
transient / exclusive queues, high queue churn (declaration & deletion rates)
low latency
data safety not priority
very long queue backlogs

# Mirrored queue (Classic)
agreement between majoirty of nodes
majority of replicas agree on state of queue and its contents

default contents of queue within rabbitmq cluster located on single node
mirror queue = 1 master + many mirrors
all operations for given queue first applied on queue's master node, then propagated to mirrors

not recommended across WAN
consumer connected to master regardless of which node they connect to
Queue mirroring enhance availabilit, not distribute load across nodes

## ha-mode
exactly
  - number of queue replicas (master + mirror) in cluster
  - if node count < count node, queue mirrored to all nodes

all: queue morrored across all nodes
  - mirror to quorum (n/2+1) to cluster node recommended
    - eg. 2 nodes in 3 node cluster, 3 nodes in 5 node cluster
  - unnecessary in most cases

node: queue mirrored to nodes listed in "node names"
`rabbitmqctl cluster_status` have form rabbit@hostname


# command
curl -i -u rabbitmq:rabbitmq -X PUT -H "Content-Type: application/json" \
  -d '{"pattern":"h1","definition":{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}}' http://192.168.240.28:30012/api/policies


# nack
nack/reject with requeue=1
- msg returned to queue as though new msg

nack/reject with requeue=0
- dead letter exchange









