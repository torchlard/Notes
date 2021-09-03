# cache layer
## service layer
SQL request from user
AS result cache
present for 24 hours across virtual warehouse

avaliable for other users

## compute layer
data manipulation, loading and computation use EC2 instance
better latency, volatile in memory
like buffer pool

AS local disk IO, in SSD storage

## storage layer
remote disk storage in S# / microsoft Blob storage
handle huge amount of data with high latency
highly durable in event of data centre failure

AS remote disk storage














