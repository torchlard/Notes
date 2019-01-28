# index
dense index = that index appear in every record with search key
sparse index = that index appear in some record with search key
primary index = record sort by that index
secondary index = record not sort by that index

# to create new account in mysql
1. login to mysql console using root account
2. create user '<username>'@'<hostname>' identified by '<password>';
3. grant all privileges on *.* to '<user>'@'<host>' with grant option;

# data type
tinyint, smallint, mediumint, int, bigint
float, double
decimal(m,d): approximation 
char, varchar, tinytext, text, mediumtext, longtext [text based, canspecify charset]
tinyblob, blob, mediumblob, longblob [binary, only read as whole]
date, time, datetime, timestamp(store last modified time, not for storing time)

# attributes
NULL, NOT NULL
DEFAULT xxx
PRIMARY KEY, AUTO_INCREMENT
UNSIGNED, CHARACTER SET name

# operations
```sql 
show databases;
use sakila;
show tables;
drop databases mydb;

create database testdb;
use testdb;
create table teacher(
  id int primary key auto_increment,
  name varchar(20),
  gender char(1),
  age int(2),
  birth date,
  description varchar(100)
  );
desc teacher;
drop table student;

alter table student add column job varchar(10);
alter table student modify job char(40);
alter table student change job job1 char(20);
alter table student drop column job;

insert into student(name,sex,job1) values("io","D","horsing");
update student set name="kvl",sex="M" where name="kl2";
delete from student where name="io";
delete from student;    (delete all)

set autocommit = false;   --set to manual control
commit;   --manual commit for each transaction
rollback;   --rollback previous transaction

limit 1,4   --start from 1, offset 4

constraint userID_payment foreign key userID references payment p_userID
  on delete {restrict | cascade | set null | no action}
  on update {...}
alter table employee add foreign key(dept_id) references department(id);

create index index_name on employee (name(10));
drop index index_name on employee;
```
## rules
ordering: group by > having > order by

## subquery
`order by` cannot be used in subquery, only used in main query
`between` cannot be used in subquery, ok within subquery

## program
### logic
select case 1 when 1 then 'k' when 2 then 'e' else 'me' end as res;
> res: k
select if(1>2, 'yes', 'no');
> no
select ifnull(NULL,'y');   (if first arg not NULL, reutrn 1st, else 2nd)
> y
select nullif('say','me');  (if 'say'=='me' => NULL, else first arg)
> NULL

### string
select insert('smyh001',2,3,'002');
> s002001
left, right, ltrim, rtrim, trim
strcmp, concat, substring

### take date/time
date format: 2014-10-16 OR 2014/10/16

select dayofmonth('2014-10-16')
> 16
dayofweek, dayofyear, dayofmonth, weekday
year, quarter, month
select hour('10:05:03')
> 10
hour, minute, second
to days, from days
curdate(), curtime(), now()

===========================
# import file
`mysql -u <user> -p<password> <dbname> < /path/to/file.sql`






