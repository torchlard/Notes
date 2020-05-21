# MDC
Mapped diagnostic Context
enrich log message with piece of information not available in scope where logging actually occurs

when log msg created, not possible to access Transfer object

## structure
MDC structure internally attached to executing thread same way ThreadLocal variable would
1. fill MDC with info make available to appender
2. log message
3. clear MDC



# History
performance

java.util.logging < log4j < logback < log4j2
- slfj is only common interface for logging API


















