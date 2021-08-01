spark.readStream().format("socket")
    .option("host","localhost")
    .option("port", "9090")
    .load()

count.writeStream
  .format("console")
  .outputMode("complete")
  .start()
  .awaitTermination()

spark.readStream.format("kafka")
  .option("kafka.bootstrap.servers", "192.168.1.100:9092")
  .option("subscribe", "json_topic")
  .option("startingOffsets", "earliest")
  .load()


df.select(col("firstname"), col("lastname")).show()

# select columns by regex
db.select(df.colRegex("`^.*name*`")).show()

# select first 3 columns and top 3 rows
df.select(df.columns[:3]).show(3)








