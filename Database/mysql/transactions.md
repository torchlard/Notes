# Connection management
each client connection get own thread within server process
- no need created, destroyed for each new connection
- when client connect to mysql server, need authentication
- username, originating host, password
- X.509 certificate used across SSL connection

# lock granularity
some db not offer choice of lock
table lock, row lock

# transaction
mysql not manage transaction at server level, but storage engine does
=> can't mix different engine in single transaciton
rollback is problem if non-transactional table

MVCC: twist on row-level locking
- allow nonlocking reads
- only lock necessary rows during write operations
