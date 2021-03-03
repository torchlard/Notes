# task history
SELECT * FROM table(INFORMATION_SCHEMA.task_history())

show tasks
ALTER task t2 RESUME

# script
```sql
CREATE OR REPLACE PROCEDURE demo_Db.PUBLIC.ab1 () RETURNS varchar LANGUAGE javascript AS $$
snowflake.execute({sqlText: `insert into demo_Db.public.t15 values( CURRENT_TIMESTAMP() )` })
$$;

SELECT * FROM table(INFORMATION_SCHEMA.query_history());
SELECT * FROM table(INFORMATION_SCHEMA.task_history());

CREATE OR REPLACE task demo_db.PUBLIC.t2
WAREHOUSE = <wh>
SCHEDULE = '1 minute'
TIMESTAMP_INPUT_FORMAT = 'YYYY-MM-DD HH24'
AS CALL demo_db.PUBLIC.ab1();
```

# param
AFTER <string>: specify predecessor task for current task

root task should have defined schedule
- max 100 child task
- simple tree of task max 1000 tasks (include root)
- all tasks in a tree must same task owner, same schema
- account max 10000 resumed task
- at most 1 instance of task with defined schedule is running at given time


inserts change tracking data for INSERT operation from a stream into table every 5 minutes
```sql
CREATE TASK mytask1
  WAREHOUSE = mywh
  SCHEDULE = '5 minute'
WHEN
  SYSTEM$STREAM_HAS_DATA('MYSTREAM')
AS
  INSERT INTO mytable1(id,name) SELECT id, name FROM mystream WHERE METADATA$ACTION = 'INSERT';
```













