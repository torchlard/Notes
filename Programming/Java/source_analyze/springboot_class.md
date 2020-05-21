# BeanFactory (interface)
root interface to access spring bean container, basic client view
- implemented by obj that hod a num of bean definitions, each uniquely identified by String name
- return independen instance (prototyep design) / single shared instance (Singleton design)

BeanFactory = central registry of application component, centralized configuration
better to use "push" configuration through setter/constructor, not "pull" (like BeanFactory lookup)

no constraint how definition could be stored
- LDAP, RDBMS, XML, .properties ...

bean factory implementation should supoort standard bean lifecycle interface as far as possible
- setBeanName
- setBeanClassLoader
- setBeanFactory
- setEnvironment
- setEmbeddedValueResolver
- setResourceLoader* 
- setApplicationEventPublisher*
- setMessageSource*
- setApplicationContext*
- setServletContext^
- postProcessBeforeInitialization
- afterPropertiesSet
- custom init-method
- postProcessAfterInitialization

*: only applicable when run in application context
^: for web application context











