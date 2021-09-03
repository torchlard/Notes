# two phase commit (2PC)
protocol for distributed system
to keep ACID, 
- each node return operation result to coordinator
- after collecting all result, command nodes if commit their results

1. 1 coordinator, other as participants, all nodes can communicate
2. all nodes use write-ahead logging, persist on reliable device
3. all nodes will not corrupt permanently, auto recover

## first phase (voting)
1. coordinator ask participants if operation can execute, wait for response
2. participants run all transactions, write undo and redo msg into log
3. if success, return "agree", else return "stop"

## second phase (commit)
### success
all participants return agree:
1. coordinator send "formal commit" to all nodes
2. participants start op, send "finish"
3. coordinator receive all "finish" msg, transaction completed

### fail
if any participant return "stop" / timeout:
1. coordinator send "rollback" to all participants
2. participants use undo log to rollback
3. all return "rollback complete"
4. coordinator get all "rollback complete", abort transaction

# three phase commit
![](img/Three-phase_commit_diagram.png)

two phase commit cannot dependably recover from failure of both coor and cohort member
- possible failed cohort member first notified, actually done commit

eliminate problem by prepared to commit state
- coordinator won't send doCommit until all cohort members ACKed prepared to commit


















