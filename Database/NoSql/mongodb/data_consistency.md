# acknowledgement
tell client whether write operation success or not

1. with ack (stronig data consistency)
2. without ack (weak data consistency)

implement by write concern
return error by `db.getLastError()`
if catch error, can rewrite again / log

## write concern (寫安全)
level of acknowledgement requested from mongodb 
how to determine write operation acknowledge success

{w: <value>, j: <boolean>, wtimeout: <num>}

w: write operation propagated to n instance (with specified tags)
  - 1: with ack, 0: without ack, >1: for replica
  - <tag set>: write passed to node with tag

return as `WriteResult({ })` / `WriteResult({ "nInserted": 1 })`

j: write operation has been written to on-disk journal (need enable journal)
  - write to journal operation must wait until next time submit journal
  - can increase commit journal freq

wtimeout: time limit to prevent write operations from blocking indefinitely (ms)
  - if >wtimeout, return error
  - before wtimeout, not rollback other success write operation

|              | j unspecified                              | j:true          | j:false   |
|--------------|--------------------------------------------|-----------------|-----------|
| w:1          | in memory                                  | on-disk journal | in memory |
| w:"majority" | on-disk journal if running with journaling | on-disk journal | in memory |

