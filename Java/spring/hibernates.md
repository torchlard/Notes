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
not thread safe, create and destroy as neede

- transient
instance of persistence class, not associated with session
- persistent
make instance persistent by associating with Session
instance = representation in db, identifier value, associate with Session








