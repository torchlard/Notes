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
- facotry class of EntityManager
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
- DAO/service class eg. create, find, delete employee
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
@SequenceGenerator: define value for property @GeneratedValue
@TableGenerator: define value generator for property in @GeneratedValue

@AccessType
@Transient: value that never stored in db
@Column: column/attribute for persistence property
@JoinColumn: entity collection (many-one, one-many)
@UniqueConstraint: unique constraint for primary, secondary table

@ManyToMany | ManyToOne | OneToMany | OneToOne
@NamedQueries | NamedQuery




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







