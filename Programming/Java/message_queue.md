# AMQP (Advanced Message Queuing Protocol)
RabbitMQ implement AMQP

## process
1. setup connection
2. setup Channel
3. producer send msg to exchange in broker
4. route msg by routing strategy, redirect msg to queue
5. consumer listen to queue; if there's msg in queue, then send to consumer
6. msg confirm received and managed, send ACK to corresponding queue
7. if queue not receiving ACK, msg resend to another channel
```
message -> broker -- exchange -- binding -> queue1 -> consumer
                                         -> queue2
                                         -> queue3
```
only queue can keep message

## routing
multiple consumer, each consumer independent queue
how exchange route msg depend on exchange type and rule

## concept
### exchange

### binding

### channel

### connection

## 5 communication model
1. direct exchange
match routkey in msg to queu's routkey

2. fanout exchagne
when exchange get msg, duplicate multiple copy send to queue bind to itself

3. topic exchange
generic matching

4. headers exchange
5. system exchange


# JMS (Java Message Service)
JMS API = service standar / protocol
ActiveMQ is implementation of JMS

## P2P
queue as message carrier
1 msg only used by 1 consumer
message not consumed wait for timeout / being consumed

## Pub/Sub
Topic as message carrier, similar to broadcast
publisher publish message, that msg send to all subscriber via topic
consumer subscribe to topic after broadcast not receive that msg

## 5 msg format
StreamMessage
MapMessage
TextMessage
ObjectMessage
ByteMessage

# Message Middleware
special message queue system, solve async calling problem


# RabbitMQ
```
Producer1 -> Exchange1 -|-> Queue1 -|-> Consumer1
                        |           |-> Consumer2
Producer2 -> Exchange2 -|-> Queue2 -|-> Consumer3
```
routing-key, priority, delivery-mode

binding to bind exchange and queue
in RabbitMQ, message can only be stored in queue

topic:
RoutingKey: separate by ".", each section a key word







