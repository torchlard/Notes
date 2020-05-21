# history
most system need same set of standard capabilities
- eg. persistence, transaction integrity, concurrency control which JDK lacked

create Enterprise Java Bean specification in 1997
- write code in standard way
- many common concern automatically handled

# EJB
Java class with >= 1 annotations from EJB spec
- grant class special powers when running inside EJB container
- previously use class implementation method

## Session beans
encapsulate business logic invoke programmatically by client
hide complexity ~ web service

lifecycle: in either of state (stateless, stateful, singleton)

stateless: no state, shared

stateful: unique to each client, representing client's state
- client interacts with its bean
- destroyed when client terminates

singleton: 
- instantiated once per applicaiton
- lifecycle = application
- states shared across all clients

## Message Driven Beans
process message asynchronously
act as JMS msg listener

# JNDI names
Java Naming Directory Interface
- directory servie to lookup resources
- every resource like EJB, datasource, JMS queue given JNDI name
naming: {resourceType}/{resourceName}
















