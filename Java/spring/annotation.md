# @Target
## ElementType
constructor, field, local_variable
method, package, parameter, type

# @Inherited
only effective class level annotation,
if child class extends parent class,
only inherited annotation will be used


# @Scheduled
## method
- cron()
cron-like expression, include second,min,hour,day of month... 

fixedDelay()
- for fixed duration, not exact time
- time in ms (last invocation start - next invocation start)

fixedRate()
- time in ms (last invocation end - next invocation start)

## cron
for fixed time
### format
second(0-59) 
min(0-59) 
hour(0-23) 
day(0-31) 
month(0-11) 
weekday(1-7 {1=SUN} OR SUN,MON,TUE,WED,THU,FRI,SAT)
year(1970-2099)

since day and weekday are mutual exclusive, 

### example
0 0 10,14,16 * * ?  every day 10am,2pm,4pm
0 0/30 9-17 * * ?   from 9 to 5 every half hour
0 0 12 ? * WED       every wednesday 12:00

### principle
if cron period = 5s, task need to run 7s

t1 = start at 0s, end at 7s
t2 = next task start at 10s
- because it look at start time of last task



















