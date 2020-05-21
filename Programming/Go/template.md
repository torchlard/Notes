# intro
```go
// space trimming
"{{23 -}} < {{- 45}}" => "23<45"

{{ /* comment */}}

// if value of pipeline is empty no oiutput generated
// otherwise T1 executed
{{if pipeline}} T1 {{end}}

{{range pipeline}} T1 {{else}} T0 {{end}}


```

# arguments
'.' => value of dot
$pi => value of variable
.Field => value of field
.Field1.Field2 => chained

.field1.key1.field2.key2 => key invocation maybe chained









