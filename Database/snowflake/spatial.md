# geography data type
follows WGS 84 standard

longitude (-180 to +180), latitude (-90 to +90)
altitude not supported

support input and output format
- WKT, WKB, EWKT, EWKB
- GeoJSON

spatial reference system identifier: WKT, WKB
non-standard format from PostGIS: EWKT, EWKB

## types
Point, MultiPoint
Polygon, MultiPolygon
LineString, MultiLineString



# sql
```sql
ALTER SESSION SET geography_output_format='GeoJSON';

```



