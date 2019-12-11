
# isolation
## MVCC (multi version concurrency control)
read uncommited
- since no lock on query -> dirty read
read commited
- no lock between records, allow inserted near locked records -> non-repeatable read
repeated read
- multiple read on same data range -> return first query result (phantom read)
serializable
- InnoDB implicitly add shared lock on all query, solve phantom read problem

default repeated read, but next-key can solve phantom read to some extend
