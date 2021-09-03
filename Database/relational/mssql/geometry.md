# spatial data
geometry: data in Euclidean (flat) coordinate system
geography: data in round-earth coord system

# spatial data object

Geometry
  - Point
  - Curve
    - LineString
    - CircularString
    - CompoundCurve
  - Surface
    - Polygon
    - CurvePolygon
  - GeomCollection
    - MultiSurface
      - MultiPolygon
    - MultiCurve
      - MultiLineString
    - MultiPoint

## instantiate
STPointFromText()

## point
single location represented by latitude, longitude
value measured in degrees

### geometry
X, Y coorinate
SRID: spatial reference ID

### geography
lat [-90,90], long (-180, 180]

geo1.STX, geo1.STY => get x,y coord



# function
STAsText()





