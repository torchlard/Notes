# Entity
## requirement
1. use javax.persistence.Entity to annotate
2. has no param constructor
3. class cannot be final
4. if object pass as value, must implement Serializable
5. object instance must be private, access by methods

```
Persistence --create--> EntityManagerFactory --create--> EntityManager
                                 ^                            ^
                               config                       manage
                                 |                            |
                            Persistence Unit --create--> PersistenceContext
```
```java
public interface EntityManager {
  public void persist(Object entity);
  public void remove(Object entity);
  public <T> T find(Class<T> entityClass, Object primaryKey);
}

public interface EntityManagerFactory {
  public EntityManager createEntityManager();
  public CriteriaBuilder getCriteriaBuilder();
  public Metamodel getMetamodel();
}
```
object persisted to db by EntityManager managed by PersistenceContext = managed object
JPA providers implements EntityManager

config of creating EntityManger: eg. persistence.xml in META-INF

```java
// JavaEE
@PersistenceUnit(unitName="unitNameDefconfig")
private EntityMangerFactory emf;

// JavaSE
EntityManagerFactory emf = Persistence.createEntityManagerFactory("unitNameDefconfig");
```



# Hibernate
## EntityManager implementation
hibernate-core/src/main/java/org/hibernate/internal/SessionImpl.java

clear(): persistenceContext, actionQueue, listeners


















