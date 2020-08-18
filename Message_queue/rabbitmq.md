# tool
rabbitmqctl: manage rabbitmq nodes
rabbitmq-diagnostics: diagnose, monitor and health check tools
rabbitmq-plugins: manage plugins
rabbitmq-upgrade: installation upgrade tools
rabbitmq-queues
rabbitmq-server: start rabbitmq node

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


# Mirrored queue

















