1. Mysql duplicate principle and process
2. MyIsam VS innodb
   - 5 difference
   - innodb 4 properties
   - select count(*) which faster
3. varchar
   - varchar VS char
   - varchar(50): 50 meaning
   - int(20): 20 meaning
   - why mysql design this way
4. innodb transaction and log implementation
   - types of log
   - 4 isolation level
   - how transaction implemented by log
5. Mysql binlog format
   - types, difference
   - scenario
   - log good/bad
6. how to deal with 500% cpu
7. SQL optimization
   - profile meaning
8. backup 
   - backup plan
   - backup time
   - xtrabackup principle
9. mysqldump
   - sql backup file each row only want insert...value()
   - duplicate bring master info
10. 500 DB shortest time reboot
11. Innodb read write optimization
    - read, write param
    - IO param
-   - cache param
12. how you monitor DB? 
13. Master slave consistency validation?
14. support emoji?
15. how to manage data dictionary
16. large text X, and X frequently update, mainly read
    - divide into subtable/put them together
    - write down reason
17. row lock principle
18. how to recover only 1 table, DB from mysqldump
19. 600M a, 300M b, related by tid
    - fastest time query among 50000 - 50200 records

## char VS varchar
`char`
1. store as fixed length
2. max hold 255 chars
3. faster than varchar
4. static memory allocation
`varchar`
1. store variable length
2. max up to
- 65535 chars
3. slower than char
4. dynamic memory allocation












