A **geospatial data structure** is a collection of elements with a geospatial location. It is similar to a map in other programming languages. Geospatial data structures are often used to implement other data structures like geohashes and geofences.


##### Cli Commands

- [**Geospatial Data Structure**](#geospatial-data-structure)
    - [**8.1. GEOADD**](#81geoadd)
    - [**8.2. GEOPOS**](#82geopos)
    - [**8.3. GEODIST**](#83geodist)
    - [**8.4. GEORADIUS**](#84georadius)
    - [**8.5. GEORADIUSBYMEMBER**](#85georadiusbymember)
    - [**8.6. GEOHASH**](#86geohash)
    - [**8.7. GEOSEARCH**](#87geosearch)
    - [**8.8. GEOSEARCHSTORE**](#88geosearchstore)


##### 8.1.GEOADD

This command adds the specified elements to the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

```

##### 8.2.GEOPOS

This command returns the longitude and latitude of the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geopos user:1 "subham" "codexam"

1) 1) "88.36389994668960571"

   2) "22.57260005994199279"
   
2) 1) "88.36389994668960571"

   2) "22.57260005994199279"
```

##### 8.3.GEODIST

This command returns the distance between the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geodist user:1 "subham" "codexam" km


"0.0000"
```

##### 8.4.GEORADIUS

This command returns the elements within the specified radius in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

georadius user:1 88.3639 22.5726 100 km

1) "subham"

2) "codexam"
```

##### 8.5.GEORADIUSBYMEMBER

This command returns the elements within the specified radius in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

georadiusbymember user:1 "subham" 100 km

1) "subham"

2) "codexam"
```

##### 8.6.GEOHASH

This command returns the geohash of the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geohash user:1 "subham" "codexam"

1) "tqg0y0y0y0y0"

2) "tqg0y0y0y0y0"
```

##### 8.7.GEOSEARCH

This command returns the elements matching the specified query in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geosearch user:1 frommember "subham" count 2

1) 1) "subham"

   2) 1) "88.36389994668960571"

      2) "22.57260005994199279"
      
2) 1) "codexam"

   2) 1) "88.36389994668960571"
    
      2) "22.57260005994199279"
```

##### 8.8.GEOSEARCHSTORE

This command stores the elements matching the specified query in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geosearchstore user:2 frommember "subham" count 2

(integer) 2
```
