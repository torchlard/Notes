# overview
pub/sub: default choice, highest reliability
pub/sub lite: low cost, lower reliability
  - zonal topic storage: only 1 zone
  - regional: replicate to second zone async

## compare other tech
per-message parallelism, not partition based messaging
track whether message is successfully processed

# lifecycle
                                      <---------------ACK ----------------
publisher -> message -> topic -> subscription -> message -> subscriber --|
                        -> mesage storage

## messge status
ackDeadline for outstanding message
acked
unacked: pub/sub don't receive ack within deadline, will deliver again until msg retention expire 
nacked: cause pub/sub to redeliver immediately


# result
- if pub/sub over normal, 
  - subscriberunable to keep up incoming msg
  - subscriber not ack msg as they are pulled

snaphost on Subscription, so you can seek back to point in time if need to roll back

wider network can approximate more interaction between input varaiables: for memorization

# apache kafka connector
sink connector: read from kafka topics, publish to pub/sub
source connector: read msg from pub/sub topic, publish to kafka

## use case
migrate kafka based architecture to google cloud
have frontend system store events in kafka outside google cloud
collect logs from on-premises kafka solution

# monitoring
Monitor topic, subscription

# concept
publisher: create msg, send to msg service on specified topic
topic
schema: govern data format of pubsub msg
subscription
subcriber

# integration
1. stream processing and data integration, support by dataflow
2. monitoring
3. OAuth, granular IAM
4. push-based delivery to webhook, workflow automation by Cloud Functions
5. Cloud Composer or other serverless workflows






