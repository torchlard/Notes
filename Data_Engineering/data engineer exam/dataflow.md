# Dataflow
based on Apache Beam
unified batch and stream processing
less overhead, serverless based infrastructure
portable across Dataflow, Spark, Flink as runtime

# Dataflow key term
element: table row
PCollection: distributed dataset, input, output
Transform: Data processing operation
ParDo: filter out/extract elements from large group of data

## deal with late data
solution: windows + watermark + trigger

windows: divide element groups by time span
watermark: event time, processing time
trigger: when results in window are emitted

# Best practice
Pub/Sub -> Dataflow --bad data--> Pub/Sub
                    -- good data--> BigQuery

## windows
session: within certain time when event happen
sliding: overlapping intervals
fixed
global: only 1 window

# user case
ingestion data or replication across subsystem
ETL workflows ingest data into bigquery
powering BI dashboard
Applying ML in realtime to streaming data

# Dataflow VS Dataproc
dataproc designed for batch processing using hadoop and spark
dataflwo for realtime and batch processing using variety of frameworks

# FAQ
- to create unique identifier for each row in streaming data, use DoFn function in Dataflow that call external HTTP service for unique idnetifier
- to test change easily: DirectRunner to test-run pipeline using local compute power, staging storage bucket
- flatten transformation merge multiple PCollection into single PCollection
- not trigger: element size in bytes
