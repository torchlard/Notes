# 
Cache = pull data out db and live outside
flushing cache = push modified data back to db
PersistenceContext = cache, tend to have non-shared db connection
EntityManager = represent PersistenceContext
EntityManagerFactory = create EntityManager (therefore cache)

## cache == PersistenceContext
getBalance(): without copy of data in memory, has to query db everytime
when data flushed, data sent to db via many SQL updates/insert/delete

if > 1 PersistenceContext/Cache relating same data in same transaction
- in one transaction want exactly 1 persistenceContext for given set of data

## Cache and detaching
detach = persistent object leaving PersistenceContext/Cache
- may not have all data you need

lazy loading: 
data isn't pulled from db and into persistenceContext/cache until requested in code

side effect:
- Collection becomes detached before fully read
- may have strange error


















