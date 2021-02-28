CREATE USER smith IDENTIFIED BY 123456;
GRANT CREATE TABLE TO smith;
GRANT CREATE SESSION TO smith;

-- schema is part of a user
SELECT username, account_status
FROM dba_users

ALTER USER smith DEFAULT tablespace users quota unlimited ON users;


