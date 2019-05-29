# properties
not requrie POJO, POJI model programming
loosely coupled class wrt. hibernate API

# funcitonality
- Auto DDL, do DDL operation like table creation, dropping, alter table
- Auto primary key generation
- independent of db => HQL (Hibernate Query language)
- exception handling not mandatory
- support cache memory
- ORM tool


# Hibernate architecture
```
Mapping Information
    ^addAnnotation()
    |
    |     buildSessionFactory()    openSession()    --beginTransaction() -->Transaction
Configuration -------->SessionFactory------>Session --createQuery()      -->Query
    |                                               --createCriteria()   -->Criteria
    |configure()
    v
DB information
```

```java
Configuration cfg = new Configuration();
cfg.configure();

SessionFactory factory = cfg.buildSessionFactory();
Session session = factory.buildSession();

Transaction tx = session.beginTransaction();
tx.commit();

Query query = session.createQuery();
Criteria criteria = session.createCriteria();
```

## workflow
```
Object based / mapping persistence logic
[HB cfg file, entity class, HB mapping file]
  |obj      |obj
  |         |
Hibernate framework
  |          |
[JDBC, JNDI, JTA]
      |
  JDBC driver
      |
   database
```
1. write persistence logic to perform specific operation to db
2. class with persistence logic interact with hibernate framework
3. hibernate framework interact with JDBC, JNDI, JTA to access db do persistence
4. use JDBC interact with db => CRUD


# session
get physical connection with db
lightweight, instantiate each time interaction needed with db
not thread safe, create and destroy as needed

- transient
instance of persistence class, not associated with session

- persistent
make instance persistent by associating with Session
instance = representation in db, identifier value, associate with Session

# type
## primitive
integer                               --  INTEGER
long                                  --  BIGINT
short                                 --  SMALLINT
float                                 --  FLOAT
double                                --  DOUBLE
big_decimal --  java.math.BigDecimal  --  NUMBERIC
character   --  java.lang.String      --  CHAR(1)
string      --  java.lang.String      --  VARCHAR
byte        --  byte/java.lang.Byte   --  TINYINT    
boolean     --  boolean               --  BIT

## date time
date          --  java.util.Date / java.sql.Date      --  DATE
time          --  java.util.Date / java.sql.Time      --  TIME
timestamp     --  java.util.Date / java.sql.Timestamp --  TIMESTAMP
calendar      --  java.util.Calendar                  --  TIMESTAMP
calendar_date --  java.util.Calendar                  --  DATE

## bianry and large object
binary
text
serializable
clob
blob

## JDK related
class     --  VARCHAR
locale    --  VARCHAR
timezone  --  VARCHAR
currency  --  VARCHAR


# collections mapping
java.util.Set
java.util.SortedSet
java.util.List
java.util.Collection
java.util.Map
java.util.SortedMap

`<primitive-array>` for Java primitive values, `<array>` for everything else

# HQL
object-oriented query language
adv: 
high db portability, take advantage of Hibernate's SQL generation and caching strategies

Keywords like (SELECT,FROM,WHERE) not case-sensitive; table,column name case-sensitive


# Fetching 
## question
when data fetch? how to fetch?

## default
EAGER: @Basic, @ManyToOne, @OneToOne
LAZY: @OneToMany, @ManyToMany, @ElementCollection

## strategy
### static 
> done in mapping

join (EAGER)
- get associated instance/collection in same select (outer join)
select (EAGER/LAZY)
- separate SQL select
subselect (EAGER/LAZY)
- get all entities get from previous query/fetch 
batch (EAGER/LAZY)
- optimization, get batch of entity instances

if use direct fetching (eg. entityManager.find(Employee.class, 1L)), auto add join to SQL
if use entity query fetch, cannot override SQL, so use secondary select 

### dynamic
fetch profiles
HQL/JPQL
entity graphs

## fetch timing
immediate fetching
- fetch when owner loaded

lazy collection 
- fetch when applicaiton invoke operation upon that collection (default)

extra-lazy
- individual element access from db when needed
- not fetch into memory unless absolutely needed

proxy 
- single-valued association fetched when method (not getter) invoked upon associated object

no-proxy fetching
- single-valued association fetch when instance variable accessed
- less lazy than proxy fetching

lazy attribute
- an attribute/single-valued association fetch when instance variable accessed


# Entity Graph
to load entity association, static meta configuration (not flexible)
problem: cannot switch between LAZY and EAGER at runtime
goal: improve runtime performance when loading entity's related association and basic fields



# N+1 problem
issue N subqueries to get associated N entities of parent entity








