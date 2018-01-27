# SharedStreets (Node.js & Javascript)

Node.js & Javascript implementation of [SharedStreets Reference System](https://github.com/sharedstreets/sharedstreets-ref-system).

## Install

**In Node.js**

```bash
$ npm install sharedstreets
```

**In browser**

Download the [CommonJS](https://unpkg.com/sharedstreets/dist/sharedstreets.js) or [UMD Minified](https://unpkg.com/sharedstreets/dist/sharedstreets.min.js) files, and include it in a script tag.

This will expose a global variable named **sharedstreets**.

```html
<script src="sharedstreets.min.js" charset="utf-8"></script>
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [geometryId](#geometryid)
-   [intersectionId](#intersectionid)
-   [referenceId](#referenceid)
-   [latlonsToCoords](#latlonstocoords)
-   [generateHash](#generatehash)
-   [getRoadClass](#getroadclass)
-   [getFormOfWay](#getformofway)

### geometryId

Geometry Id

SharedStreets Geometry Java Implementation
<https://github.com/sharedstreets/sharedstreets-builder/blob/master/src/main/java/io/sharedstreets/data/SharedStreetsGeometry.java#L98-L108>

**Parameters**

-   `line` **(Feature&lt;LineString> | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>>)** Line Geometry as a GeoJSON LineString or an Array of Positions Array&lt;&lt;longitude, latitude>>.

**Examples**

```javascript
sharedstreets.geometryId([[110, 45], [115, 50], [120, 55]]);
// => 'ce9c0ec1472c0a8bab3190ab075e9b21'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** SharedStreets Geometry Id

### intersectionId

Intersection Id

SharedStreets Intersection Java Implementation
<https://github.com/sharedstreets/sharedstreets-builder/blob/master/src/main/java/io/sharedstreets/data/SharedStreetsIntersection.java#L42-L49>

**Parameters**

-   `pt` **(Feature&lt;Point> | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>)** Point location reference as a GeoJSON Point or an Array of numbers &lt;longitude, latitude>.

**Examples**

```javascript
sharedstreets.intersectionId([110, 45]);
// => '71f34691f182a467137b3d37265cb3b6'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** SharedStreets Intersection Id

### referenceId

Reference Id

Shared Streets Reference Java Implementation
<https://github.com/sharedstreets/sharedstreets-builder/blob/master/src/main/java/io/sharedstreets/data/SharedStreetsReference.java#L323-L340>

**Parameters**

-   `locationReferences` **(FeatureCollection&lt;Point> | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Point>)** Location References in a form of a GeoJSON FeatureCollection or Array of points.
-   `formOfWay` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Form Of Way

**Examples**

```javascript
const locationReferences = [
  sharedstreets.locationReference([-74.00482177734375, 40.741641998291016], {outboundBearing: 208, distanceToNextRef: 9279}),
  sharedstreets.locationReference([-74.005126953125, 40.74085235595703], {inboundBearing: 188})
];
const formOfWay = 'MultipleCarriageway';

sharedstreets.referenceId(locationReferences, formOfWay);
// => '41d73e28819470745fa1f93dc46d82a9'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** SharedStreets Reference Id

### latlonsToCoords

latlonsToCoords

**Parameters**

-   `latlons` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Single Array of paired latitude & longitudes

**Examples**

```javascript
latlonsToCoords([45, 110, 55, 120]);
// => [[110, 45], [120, 55]]
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** GeoJSON coordinate format

### generateHash

Generates Base16 Hash

**Parameters**

-   `message` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Message to hash

**Examples**

```javascript
sharedstreets.generateHash('Intersection -74.00482177734375 40.741641998291016');
// => '69f13f881649cb21ee3b359730790bb9'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** SharedStreets Reference ID

### getRoadClass

getRoadClass

**Parameters**

-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number value [between 0-8]

**Examples**

```javascript
sharedstreets.getRoadClass(0); // => 'Motorway'
sharedstreets.getRoadClass(5); // => 'Residential'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Road Class

### getFormOfWay

getFormOfWay

**Parameters**

-   `value` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number value [between 0-8]

**Examples**

```javascript
sharedstreets.getFormOfWay(0); // => 'Undefined'
sharedstreets.getFormOfWay(5); // => 'TrafficSquare'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Form of Way
