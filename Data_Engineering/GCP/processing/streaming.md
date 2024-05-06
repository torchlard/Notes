# streaming
transmit continuously from many data source in small size (KB)
require low latency
Pub/Sub for streaming -> dataflow real time processing

# batch
gsutil cp [storage_location] gs://[bucket]
cloud SQL, bigquery, cloud storage


# overview
tightly coupled system
loosely coupled system
- fault tolerance
- scalable
- message queue

Publisher -> message -> Topic -> subscription -> message -> Subscriber => ACK
                        -> message storage

## mode
push: push message to subscriber
    - need webhook endpoint accept POST
    - more real time
pull: pull msg from queue
    - ideal for batch delivery, large volume

pub/sub not care about message ordering
Dataflow resolve out of order, can add msg attributes

## step
1. create topic
2. create subscription
3. publish message to topic
4. retrieve message with subscription, ack receipt, remove message from queue

# integrate with Kafka
not always replace Kafka
interact with existing tools

source connector: sth -> Kafka
sink connector: Kafka -> sth

# monitoring subscriber health
- create alerts for x backlog threshold
- subscriber not able to keep up
- not ack msg receipt
- check publishers for excessive re-transmit








