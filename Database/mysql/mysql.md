# index
dense index = that index appear in every record with search key
sparse index = that index appear in some record with search key
primary index = record sort by that index
secondary index = record not sort by that index

## to create new account in mysql
1. login to mysql console using root account
2. create user '<username>'@'<hostname>' identified by '<password>';
3. grant all privileges on *.* to '<user>'@'<host>' with grant option;

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

-- constraint "constraint-name" foreign key "your key in this table"
-- references "another table" "other table's field"
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


## storage
### numeric type
[*: exact numeric, ~: approx numeric]

*tinyint: 1B (+-half 2^8)
*smallint: 2B  (+-half 2^16)
*mediumint: 3B (+-half 2^24)
*int,*integer: 4B  (+-half 2^32)
*bigint: 8 B (+-half 2^64)

*decimal, *numeric
- eg. decimal(5,2): precision 5(num sig digit), scale 2(num digit after decimal point)
- decimal max digits = 65
  
~float: 4 B (single-precision) 
~double: 8 B (double precision)

bit(M): (m+7)/8
- store m bit value, 1-64

#### numeric attribute
smallint(3): 
keey smallint range -32768 to 32767, but zerofill to display 3 digits

#### auto_increment
integer, floating-point can have auto_increment
if field assigned NOTNULL, can insert null -> convert to next int
if inserted larger int, start seq from that int

#### overflow, out of range
if strict mode, reject
if non-strict moide, clip value


### Date and time type
year/year(4): 1
- range: 1901-2155, 0000
- 00-69 -> 2000-2069, 70-99 -> 1970-1999
date: 3
- 1000-01-01 to 9999-12-31
- format: xx-xx-xx OR xx/xx/xx
time: 3
- -838:59:59.000000 to 838:59:59.000000
  
datetime: 5 B
- 1000-01-01 00:00:00 to 9999-12-31 23:59:59
- value contain both date and time parts
- can have tractional seconds
- eg. 1000-01-01 00:00:00.000000
- no timezone conversion
  
timestamp: 4 B
- 1970-01-01 00:00:01 to 2038-01-19 03:14:07
- convert value from current time zone to UTC for storage
- back to current time zone for retrieved
- default use server's timezone

#### date, time conversion
date -> datetime/timestamp
- add '00:00:00'

datetime/timestamp -> date
- '1999-12-31 23:59:59.499' -> '1999-12-31'
- '1999-12-31 23:59:59.500' -> '2000-01-01'

datetime/timestamp -> time
- discard date part

date -> time
- '00:00:00'
time -> date
- CURRENT_DATE() + time value


### String type 
char(M): M*w
- length 0-255
varchar(M), varbinary(M): 
- length 0-65535 [max row size 65535 B]
- 1B/2B prefix + data => indicate num of bytes
binary(M), varbinary
- similar to char, varchar; contain binary string
- M in bytes, 0 <= M <= 255

blob, text: L+2
- blob = binary large object
- text = non-binary string
  
tinyblob, tinytext: L+1
mediumblob, mediumtext: L+3
longblob, longtext: L+4

enum('val1', 'val2'): 1/2 B
- string object with few permitted values
- adv: compact data storage, readable query and output
- issue: extra care for order by
- strongly recommend not using number, but string
  
set('val1', 'val2'): 1,2,3,4/8 B
- max 64 distinct members
- can insert multiple distinct value in same record
- sum()/avg() -> use numeric value

#### varchar overflow 
if strict, reject too long string
if non-strict, eg. varchar(4) store 
  'abcdefgh' -> 'abcd' with 5 B

### spatial type
single geometry value
- geometry, point, linestring, polygon

collection of values
- multipoint, multilinestring, multipolygon, geometrycollection

### JSON type
adv over in string column
- automatic validation of JSON document
- optimized storage format

no default value
support partial, in-place update of JSON column
- json_set(), json_replace(), json_remove()
- new value cannot > old value
- {"a":1,"b":2,"c":3} (must use ", not '), input as string

===========================
# import file
`mysql -u <user> -p<password> <dbname> < /path/to/file.sql`






