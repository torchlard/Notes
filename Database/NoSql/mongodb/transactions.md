# transactions
multi-document transactions start form mongo 4.0

## limitation
1. collection must exist
2. collection/index cannot created/dropped
3. non-CRUD operations not permitted
4. tx cannot read/write in config,admin,local db
5. tx cannot write to system.* collections
6. tx size <= 16MB
7. tx auto expire after 60s

## session
any tx associate with an open session

session.startTransaction()
session.commitTransaction()
session.abortTransaction()


















