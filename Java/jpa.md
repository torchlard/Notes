# Principle
JPA form bridge between object model(Java program) and relational model (db program)
collection of classes and method to persistently store data into db
- standard of define POJO as entity

## mismatch among relational, object model
granularity: object model more granularity
subtype: not supported by all db
Identity: relational model not expose identity while writing equality
Association: relational cannot determine multiple relationships while looking in object model
data navigation: data navigation between objects different

## architecture
Entity manager factory
- factory class of EntityManager
Entity Manager
- interface, manage persistence operations on objects
- factory for Query instance
Entity
- persistence objects, stored as records in db
Entity transaction
- one-to-one relationship with EntityManager
Query
- implemented by each JPA vendor to obtain relational objects that meet criteria
Persistence
- obtain EntityManagerFactory instance

one -> many: 
- EntityManagerFactory -> EntityManager
- EntityManager -> Query
- EntityManager -> Entity
- EntityManager -> EntityTransaction

## ORM (Object Relational Mapping)
map object type <-> relational type

### phases
1. Object data contains POJO, service interface, class
- POJO with attributes ID, name, salary, designaiton; methods of setter, getter
- DAO/service class, eg. create, find, delete employee
2. Mapping/persistence phase
- JPA provider: javax.persistence (eg. Hibernates)
- mapping file: eg. ORM.xml
- JPA Loader: work like cache memory, load relational grid data
- Object grid: temp location store copy of relational data
3. Relational data phase
- when business component commit data, stored in db physically
- modified data stored in cache memory as grid format

mapping.xml
```xml
<!-- define schema to allow entity tag -->
<entity-mappings xmlns="..." xxx>
  <description>XML Mapping file</description>
  <!-- target entity class -->
  <entity class="Employee">
    <table name="EmployeeTable"/>
    <attributes>
      <id name="eid">
        <generated-value strategy="TABLE">
      </id>
      <basic name="ename">
        <!-- user-defined table field name -->
        <column name="EMP_NAME" length="100"/>
      </basic>
      <basic name="salary"></basic>
    </attributes>
  </entity>
</entity-mappings>
```

## annotations
@Entity, @Table
@Basic: non-constraint field
@Embedded: embeddable class
@Id: primary key

@GeneratedValue: how id initialized (eg. aotumatic, manual, value)
- IDENTITY: let db handle -> some db use it as PK
- AUTO: default, let persistence engine decide
- SEQUENCE: refer to generator
- @Embeddable: coomposite key

@SequenceGenerator: define value for property @GeneratedValue
@TableGenerator: define value generator for property in @GeneratedValue

@AccessType
@Transient: value that never stored in db
@Column: column/attribute for persistence property

## relational annotation
@JoinColumn: entity collection (many-one, one-many)
```java
@OneToOne(cascade=CascadeType.ALL, optional=true)
@JoinColumn(name="addressID")
public Address getAddress(){
  return address;
}
```

@UniqueConstraint: unique constraint for primary, secondary table

@ManyToMany 
@ManyToOne
- single direction, no intermediate table
- @Joincolumn(name="xx") assign foreign key name
@OneToMany 
- single direction, has intermediate table
- foreign key exists in table with more record

@ManyToOne, @OneToMany

@OneToOne
@NamedQueries | NamedQuery

@PrimaryKeyJoinColumn
- itself as foreign key and primary key in table at same time

# setting
spring.jpa.properties.hibernate.hbm2ddl.auto
- create
- create-drop
- validate
- update

## spring boot integration (mariadb)
spring.datasource.url=jdbc:mariadb://localhost:3306/xx_db
spring.datasource.username=xxxx
spring.datasource.password=xxxxxx
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

spring.datasource.tomcat.max-wait=20000
spring.datasource.tomcat.max-active=50
spring.datasource.tomcat.max-idle=20
spring.datasource.tomcat.min-idle=15 

hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.show-sql=true
spring.output.ansi.enabled=ALWAYS
spring.jpa.properties.hibernate.id.new_generator_mappings=false


## update
### entity changes
if entity name change => table generated not delete, gen new table
entity index change => 
- if no existing index, @Index added => new index
- if existing index, @Index delete => no del index in db

### field add/delete
if add field in class => create new column, not affect other row
if delete field => will not delete column in db, not affect db attribute

field name change => add/delete field

### field attr change
primary key
```java
@Entity
public class User {
  @Id
  private Long id;
  @Id
  private Long id0;
  @Column
  private String name;
}
```
auto gen statement ==>
```sql
create table `user` {
  `id0` bigint(20) not null,
  `id` bigint(20) not null,
  `name` varchar(255) default null,
  primary key (`id0`, `id`)
}
```

### column attr change
eg. unique, nullable, length
if not set these attr before
- later you add/delete attr => not affect db
- as long as column name unchange


# implement
no need to write class that implements CustomerRepository

by extending CrudRepository, CustomerRepository inherit several method
  working with Customer persistence (save,delete,find) Customer entity

# other interface
if config has JPA repository interface definition not visible, can point out alternate package using `@EnableJpaRepositories` and type-safe `basePackageClasses=MyRepository.class` parameter

# example
1. define entity class with Id
```java
@Id @GenerateValue(...)
private Long id;
private String firstName;
```
2. define xxxRepository 
```java
interface CustomerRepository extends CrudRepository<Customer,Long>{
  List<Customer> findByFirstName(String firstName);
}
```
3. test db
```java
repository.save(new Customer("Jack"));
...
repository.findByFirstName("Jack").forEach(...);
```


# Java Persistence Qeury Language (JPQL)
create query against entites stored in db
based on SQL syntax

JPQL query get entity object, rather than field result set form db for SQL
JPQL strucutre
```
select ... from ...
[where ...]
[group by ... [having ...]]
[order by ...]

delte from ... [where ...]

update ... set ... [where ...]
```
sample query
```java
EntityManagerFacotry emfactory = Persistence.createEntityManagerFactory("Eclipselink");
EntityManager entityManager = emfactory.createEntityManager();

Qeury query = entityManager.createQuery("select e from Employee e orderby e.ename ASC" );
List<Employee> list = (List<Employee>)query.getResultList();

for(Employee e: list){
  System.out.println("employee id: " + e.getEid());
}
```

# inheritanace
## single table
take all class fields, map into single talbe

## joined table
share ref column which contains unique values to join table, make easy transaction

## table per class
create table for each sub entity


# interface JpaRepository
once extends JpaRepository, then already implemented save(create,update), delete, findAll, findOne, 

extends relations:
```
CrudRepository: mainly provide CRUD functions
  PagingAndSortingRepository: methods to do pagination and sorting
    JpaRepository: JPA-related method, eg. flush persistence context, delete record in batch
```

## Pageable
Pageable: interface in Spring Data, abstraction about paging
- can get all info related to paging (eg. pageNumber, pageSize)
- get sql with paging info by pageable param

Page
- collection of part of data
- and related next part of data, data total
- get summary info (eg. data count, total page, current page no, current collection)

### gen Pageable object
```java
public Page<Blog> getEntryByParams(@RequestParam(value="page", defaultValue="0") Integer page,
  @RequestParam(value="size", defaultValue = "15") Integer size) {
    Sort sort = new Sort(Direction.DESC, "id");
    Pageable pageable = new PageRequest(page, size, sort);
    return blogRepository.findAll(pageable);
}
// ===>
public Page<Blog> getEntryByPageable(@PageableDefault(value=15, sort={"id"}, Pageable pageable )
  return blogRepository.findAll(pageable);
)
```


# HQL VS SQL
hql is object oriented, from + class name + class object + where + class field
sql is table oriented, from + table name + where + table field


# Specification
build around `Specification` interface, 
only defined 
```java
Predicate toPredicate(Root<T> root, CriteriaQuery<?>)
```

## CriteriaBuilder
construct criteria queries, compound selection, expression, predicate, ordering

## CriteriaQuery<T>
define functionality that specific to top-level queries



# error
PathVariable: boolean can pass 0|1|true|false in url 
query cannot use "`"
inside query need to use class names and field names in Java

reqeust param: cannot parse json directly, need form

for native query, parameter will auto add quote => dynamic sql not possible

# class diagram
## Repository interface 
Repository
-CrudRepository
--PagingAndSortingRepository
---JpaRepository (flush, deleteInBatch, findAll)
++++SimpleJpaRepository
+++++QueryDslPredicateExecutor

---KeyValueRepository
++++SimpleKeyValueRepository
+++++QuerydslKeyValueRepository

## Executors
QueryByExampleExecutor
JpaSpecificationExecutor

## javax.persistence
EntityManagerFactory(javax.persistence)
-HibernateEntityManagerFactory(org.hibernate.jpa)
++EntityManagerFactoryImpl(org.hibernate.jpa.internal)


## low level package
EntityManager (javax.persistence)
EntityManagerImpl (org.hibernate.jpa.internal)

## Page
Iterable <-- Slice <-- Page

### Slice
getNumber, getSize, getSort, 
Pageable(page number, page size, prev, next)
- nextPageable, previousPageable

### Page
getTotalPages, getTotalElements











