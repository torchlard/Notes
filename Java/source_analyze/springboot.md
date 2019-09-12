SpringApplication
  WebApplicationType.deduceFromClasspath
  setInitializer
    getSpringFactoriesInstances
      createSpringFactoriesInstances
        BeanUtils.instantiateClass
        instances.add(instance)
      AnnotationAwareOrderComparator.sort(instances)
    - ApplicationContextInitializer
    
  setLiostener
    - ApplicationListener
  deduceMainApplicationClass
    for(StackTraceElement)

run
  StopWatch
  configureHeadlessProperty
  getRunListener(args) -> starting
  prepareEnvironment(listeners, applicationArgs)
    getOrCreateEnvironment
      webApplicationType
        SERVLET: StandardServletEnvironment
        REACTIVE: StandardReactiveWebEnvironment
        default: StandardEnvironment
  configureIgnoreBeanInfo
  printBanner
    print
      PrintBanner(banner, sourceClass)
        Banner: {OFF,CONSOLE,LOG}
    - print to logger/stdout
  createApplicationContext
    SERVLET: 
      org.springframework.context.annotation.AnnotationConfigApplicationContext
    reactive: 
      org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext
    default: 
      org.springframework.boot.web.reactive.context.AnnotationConfigReactiveWebServerApplicationContext
    BeanUtils.instantiateClass(contextClass)

  getSpringFactoriesInstances
  prepareContext
    




