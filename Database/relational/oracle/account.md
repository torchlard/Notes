# SYS, SYSTEM account
all db include default common user account with administrative privileges

SYS schema store data dictionary, critical for operation of Oracle database

SYSTEM account auto created

## common user
either Oracle-supplied or user-created

can login to any container (including CDB$ROOT) when having `CREATE SESSION` privilege

- application common user doesn't have `CREATE SESSION` outside its own application container


## local user account
not common user, can operate only within single PDB
- can administer a PDB

local user in one PDB cannot login to another PDB / CDB root without using database link

# common object
defined in CDB root / application root
local object = every object not a common object

```sql
-- SYSTEM connects to hrpdb container using service name hrpdb
CONNECT SYSTEM@hrpdb;

-- create local user rep
CREATE USER rep IDENTIFIED BY <password>;
GRANT CREATE SESSION TO rep;
```
















