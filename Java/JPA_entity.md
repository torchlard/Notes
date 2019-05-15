# Entity
## requirement
1. use javax.persistence.Entity to annotate
2. has no param constructor
3. class cannot be final
4. if object pass as value, must implement Serializable
5. object instance must be private, access by methods

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













