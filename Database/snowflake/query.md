# join
## natural join
if 2 tables hae columns with same name, 
eg. natural join implicitly constructs
```sql
select * from table1 natural join table2;
```
join on table2.city = table1.city AND table2.province = table2.province


# sequences
generate unique numbers across sessions and statement

# persisted query result
when query is executed, result is persisted (cached)
for a period of time (currently 24 hours)

reuse if
- query syntactically match
- table data not changed
- micro-partition not changed
- not include function evaluate at execution time




















