# JavaEE transaction
## resource-local transaction
direct communicate with JDBC's DataSource
- actually database transaction
very low level, developer control whole process => not common now

## Container transaction
use JTA(java transaction api)
let container decide transaction for you

### Bean-managed Transaction (programmatic transaction management) 
interface to programmatically control tx:
UserTransaction (begin, commit, getStatus, rollback, setRollbackOnly, setTransactionTimeout(seconds))

if tx started but forget to close it -> Exception -> container rollback
tx status:
- STATUS_ACTIVE, STATUS_NO_TRANSACTION, STATUS_MARKED_ROLLBACK ...

### Container-managed Transaction (declarative transaction management)
```java
@Stateful
@TransactionManagement(TransactionManagementType.CONTAINER)
public class BusinessLogicBean implements IBusinessLogic {
  ...
}
```
@TransactionAttribute
- MANDATORY, REQUIRED, REQUIRES_NEW, SUPPROTS, ...

### problem
rely on JTA, too low level
need application server

# Spring transaction
build abstraction of transaction, just use Web container (eg. Tomcat)

use transaction strategy
```java
public interface PlatformTransactionManager {
  // TransactionException: runtime exception
  TransactionStatus getTransaction(TransactionDefinition def) throws TransactionException;
  void commit(TransactionStatus status) throws TransactionException;
  void rollback(TransactionStatus status) throws TransactionException;
}

public interface TransactionDefinition {
  int PROPAGATION_REQUIRED = 0;
  ...
  // transaction attributes
  // isolation attributes
  // timeout attribute
  // behavior
}

public interface TransactionStatus extends SavepointManager, Flushable {
  boolan isNewTransaction();
  ...
}
```
PlatformTransactionManager inject differently into runtime environment 

## adv over EJB CMT
1. EJB CMT only limited to JTA, spring transaction can be used in many environment (JTA, JDBC, Hibernate ...)
2. apply on any class
3. rollback based on exception thrown
4. AOP business logic, eg. run certain code when rollback


caller <-> proxy object <-> transaction advisor <-> other advisor <-> target method
  |                                                                         |
  ----------------------- without AOP ---------------------------------------
proxy object build all kinds of AOP task (eg. xx advisor)

## programmatic methods
```java
// 1. TransactionTemplate 

public class SimpleService implements Service {
  private final TransactionTemplate template;
  public SimpleService(PlatformTransactionManager manager){
    this.template = new TransactionTemplate(manager);
  }
  // callback
  public Object someServiceMethod(){
    return template.execute(new TransactionCallback(){
      public Object doInTransaction(TransactionStatus status){
        try {
          updateOperation1();
        } catch(SomeException ex){
          status.setRollbackOnly();
        }
        return resultOfUpdateOperation2();
      }
    })
  }
}

// 2. PlatformTransactionManager

DefaultTransactionDefinition def = new DefaultTransactionDefinition();
def.setName("SomeTxName");
def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
TransactionStatus status = txManager.getTransaction(def);
try {
  ...
} catch(MyException ex){
  txManager.rollback(status);
  throw ex;
}
txManager.commit(status);
```















