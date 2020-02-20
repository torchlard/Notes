# Unable to configure plugins: (PluginLoadingError) Couldn't find any input plugin named 'sdtin



# Don't know how to handle `Java::JavaLang::IllegalStateException` for `PipelineAction::Create<main>`


# com.mariadb.jdbc.Driver not loaded. Are you sure you've included the correct jdbc driver in :jdbc_driver_library?
wrong driver classname
OR
jar not found

solution:
copy jar to logstash-core/lib/jars


#  You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '"T1" LIMIT 1' at line 1: SELECT count(*) AS "COUNT" FROM (SELECT id,name from testdb.tb1) AS "T1" LIMIT 1
SET GLOBAL sql_mode = 'ANSI_QUOTES';





