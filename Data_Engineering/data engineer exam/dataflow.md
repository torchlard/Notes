
# Dataflow
based on Apache Beam
unified batch and stream processing
less overhead, serverless
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
