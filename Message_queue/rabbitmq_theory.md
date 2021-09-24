# command
sudo rabbitmq-server start
sudo rabbitmq-server stop

## set users
// create a user
`rabbitmqctl add_user <username> <password>`
// tag the user with "administrator" for full management UI and HTTP API access
`rabbitmqctl set_user_tags <username> administrator`

```bash
rabbitmqctl add_user admin admin
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

# introduction
messge broker, accept and forward msg

## Producing
send msg

## Queue
many producer can send msg that go to 1 queue, 
many consumer try to receive data from 1 queue

## Consuming
receive msg

if forget to ack, msg will be redelivered when client quit
- eat more and more memory, won't able to release any unacked msg
`rabbitmqctl list_queues name messages_ready messages_unacknowledged`

## reminder
not allow to redefine an existing queue with different param, 
return error to any program

default just dispatch msg when msg enter queue
- not look at #unack msg for consumer

### prefetch
prefetch(1) : queue not to give > 1 msg to a worker at a timer
- until msg processed and ack the previous one

why ACK?
- protocol methods sent are not guaranteed to reach peer / successfully process it

### data safety
when consumer registered, msg will be delivered by RabbitMQ using `basic.deliver`
- method = delivery tag
monotonically growing positive integers
- delivery tag scoped per channel

consider msg sent successfully:
immediately after msg sent out / explicit client ACK received
- basic.ack, basic.nack, basic.reject

automicatic ACK should be considered unsafe
- consumer's TCP connection / channel can be closed before successful delivery


# binding
relationship between an exchange and a queue
queue is interested in message from this exchange


# Exchanges
producer can only send msg to an exchange

## fanout
broadcast to all

## direct
msg goes to queue whose binding key = routing key of msg

## topic
msg sent to topic exchanger can't have arbitrary routing_key
- must be list of words, delimited by dots
eg. `*.orange.*, lazy.#` *: exactly 1 word, #: >=0 words

quick.orange.rabbit --mapto--> *.orange.*, *.*.rabbit



# error
## Error: Failed to initialize erlang distribution
sudo rabbitmq-plugins enable rabbitmq_management  

## from springboot: socket connection closed
reason: account using no privilege to access virtual host
solution: use account will privilege










