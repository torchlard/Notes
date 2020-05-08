# alarm
## metric alarms
watches single cloudwatch metric / result of math expresssion based on metric
  - threshold value over a number of time period

### states
OK: within threshold
ALARM: outside defined threshold
INSUFFICIENT_DATA: alarm just started, metric not available / not enough data determine

### evaluate
period: length of time to eval metric / expression to create individual data point for alarm
  - expressed in sec (eg. if 1 min as period, then 1 data point / min)
evaluation period: number of most recent period / data point to eval when determine alarm state
datapoint to alarm: num of data points within eval period
  - breaching data points don't need consecutive
  - must within last num of data points = evaluation period


## composite alarm
express takes into account alarm states of other alarms that created
  - alarm when all conditions of rule are met











# simple notification service (SNS)
web service that coordinates and manages delivery / sending of msg to subscribing endpoints / clients















