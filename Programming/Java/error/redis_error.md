# 1 
## situation
org.springframework.dao.QueryTimeoutException: Redis command timed out; 
nested exception is io.lettuce.core.RedisCommandTimeoutException: Command timed out after no timeout

## reason
timeout = 0, no time to connect

## solution
set timeout time longer in properties
`spring.redis.timeout=5000`














