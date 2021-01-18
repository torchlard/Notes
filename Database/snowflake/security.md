# mode
Discretionary access control (DAC): 
each object has owner, grant access to that object

Role-based Access Control (RBAC):
access privileges assigned to roles, in turn assigned to users

# terms
securable object: object which access can be granted; access denied unless granted
role: entity that privileges can be granted
  - roles assigned to user
  - role can be assigned to other roles
privilege: defined level of access to an object
  - multiple distinct privileges to control granularity of access granted

User: user identity associated with a person / program

# System Defined Role
## ACCOUNTADMIN
encapsulate SYSADMIN and SECURITYADMIN, top-level

## SECURITYADMIN
manage any object grant globally
create, monitor, manage users and roles

## USERADMIN
dedicate to user and role management only
CREATE USER, CREATE ROLE

## SYSADMIN
create warehouse and databases
can create role hierarchy assigns all custom roles to SYSADMIN

## PUBLIC
default role granted to every user and role in your account
explicit access control not needed

# custom role
default newly-created role not assigned to any user

top-most: SYSADMIN
allow system admin manage all objects in account

# grant
```sql
GRANT USAGE on DATABASE <db> TO ROLE <role>;
GRANT USAGE ON ALL SCHEMAS IN DATABASE <db> TO ROLE <role>;
GRANT ALL PRIVILEGES ON ALL TABLES IN DATABASE <db> TO ROLE <role>;

GRANT OWNERSHIP ON ALL TABLES IN SCHEMA <schema> TO ROLE <role>;

SHOW GRANTS TO ROLE <role>
```
you cannot drop table owned by other roles






