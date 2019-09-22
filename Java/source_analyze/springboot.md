SpringApplication
  WebApplicationType.deduceFromClasspath
  setInitializer
    getSpringFactoriesInstances
      createSpringFactoriesInstances
        BeanUtils.instantiateClass
        instances.add(instance)
      AnnotationAwareOrderComparator.sort(instances)
    - ApplicationContextInitializer
    
  setListener
    - ApplicationListener
  deduceMainApplicationClass
    for(StackTraceElement)

run
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
    postProcessApplicationContext
      registerSingleton
        - org.springframework.context.annotation.internalAutowiredAnnotationProcessor
        setConversionService
      applyInitializers
        resolveTypeArgument, initialize
    listeners.contextPrepared
    registerSingleton
      - springApplicationArguments / springBootBanner
    addBeanFactoryPostProcessor(LazyInitializationBeanFactoryPostProcessor())
      - for(bean def names): setLazyInit
    getAllSources
      - add all primarySources,sources
    load(sources)
      - createBeanDefinitionLoader
      - set bean name generator, resource loader, environment
    contextLoaded

  refreshContext
    prepareBeanFactory
      - setBeanClassLoader, setBeanExpressionResolver, addPropertyEditorRegister
      - addBeanPostProcessor, ignroeDependencyInterface, registerResolvableDependency
      - setTempClassLoader, registerSingleton

    postProcessBeanFactory
    invokeBeanFactoryPostProcessors
    regsiterBeanPostProcessor
    initMessageSource
    initApplicationEventMulticaster
    oinREfresh
    registerListeners
    finishBeanFactoryInitialization
    finishRefresh
  
  afterRefresh

  callRunners
  
  
    




