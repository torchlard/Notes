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














