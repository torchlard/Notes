KMZ to KML
KMZ is essentially a ZIP archive. Just use any zip tool to unzip the contained KML. Windows users might need to change the file extension to .zip.

KML to GeoJSON
Use the Python utility kml2geojson:

$ pip install kml2geojson --user
$ k2g input.kml output_directory


 sudo apt-get install gdal-bin

ogr2ogr -f GeoJSON -t_srs crs:84 [name].geojson [name].shp

