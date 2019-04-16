import { lineString } from "@turf/helpers";
import length from "@turf/length";
import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as sharedstreetsPbf from "sharedstreets-pbf";
import * as sharedstreets from "./src/index";

import * as turfHelpers from '@turf/helpers';

import * as tiles from "./src/tiles";
import { TileIndex } from "./src/tile_index";
import { TilePathGroup, TileType, TilePathParams } from "./src/tiles";
import { PointMatcher } from "./src/point_matcher";
import { CleanedPoints, CleanedLines } from "./src/geom";
import { Graph } from "./src/graph";
import envelope from "@turf/envelope";

const test = require('tape');


test("match points", async (t:any) => { 

    // test polygon (dc area)
    const content = fs.readFileSync('test/geojson/points_1.in.geojson');
    var pointsIn:turfHelpers.FeatureCollection<turfHelpers.Point> = JSON.parse(content.toLocaleString());
    var cleanedPoints = new CleanedPoints(pointsIn);
    
    var points:turfHelpers.FeatureCollection<turfHelpers.Point> = turfHelpers.featureCollection(cleanedPoints.clean);
 
    var params = new TilePathParams();
    params.source = 'osm/planet-180430';
    params.tileHierarchy = 6;
 
   // test matcher point candidates
   var matcher = new PointMatcher(null, params);
   
   var matchedPoints:turfHelpers.Feature<turfHelpers.Point>[] = [];
   for(let searchPoint of points.features) {
     let matches = await matcher.getPointCandidates(searchPoint, null, 3);
     for(let match of matches) {
       matchedPoints.push(match.toFeature());
     }
   }
   const matchedPointFeatureCollection_1a:turfHelpers.FeatureCollection<turfHelpers.Point> = turfHelpers.featureCollection(matchedPoints);
   
   const BUILD_TEST_OUPUT = false;
 
   const expected_1a_file = 'test/geojson/points_1a.out.geojson';
   if(BUILD_TEST_OUPUT) {
     var expected_1a_out:string = JSON.stringify(matchedPointFeatureCollection_1a);
     fs.writeFileSync(expected_1a_file, expected_1a_out);
   }
 
   const expected_1a_in = fs.readFileSync(expected_1a_file);
   const expected_1a:turfHelpers.FeatureCollection<turfHelpers.Point> = JSON.parse(expected_1a_in.toLocaleString());
   
   t.deepEqual(expected_1a, matchedPointFeatureCollection_1a);
 
   matcher.searchRadius = 1000;
 
   var matchedPoints:turfHelpers.Feature<turfHelpers.Point>[] = [];
   let matches = await matcher.getPointCandidates(points.features[0], null, 10);
 
   for(let match of matches) {
     matchedPoints.push(match.toFeature());
   }
   const matchedPointFeatureCollection_1b:turfHelpers.FeatureCollection<turfHelpers.Point> = turfHelpers.featureCollection(matchedPoints);
   
   const expected_1b_file = 'test/geojson/points_1b.out.geojson';
 
   if(BUILD_TEST_OUPUT) {
     var expected_1b_out:{} = JSON.stringify(matchedPointFeatureCollection_1b);
     fs.writeFileSync(expected_1b_file, expected_1b_out);
   }
 
   const expected_1b_in = fs.readFileSync(expected_1b_file);
   const expected_1b:{} = JSON.parse(expected_1b_in.toLocaleString());
   
   t.deepEqual(expected_1b, matchedPointFeatureCollection_1b);
 
   
   t.end();
 });
 
 
async function graph_test()  { 
 
   // test polygon (dc area)
   const content = fs.readFileSync('test/geojson/sf_centerlines.sample.geojson');
   var linesIn:turfHelpers.FeatureCollection<turfHelpers.LineString> = JSON.parse(content.toLocaleString());
   
   var cleanedLines = new CleanedLines(linesIn);  
   var lines:turfHelpers.FeatureCollection<turfHelpers.LineString> = turfHelpers.featureCollection(cleanedLines.clean);
 
   var params = new TilePathParams();
   params.source = 'osm/planet-180430';
   params.tileHierarchy = 6;
 
  //test matcher point candidates
  var matcher = new Graph(envelope(lines), params);
  
  var matchedLines = turfHelpers.featureCollection([]);
  for(var line of lines.features) {
    matchedLines.features.push((await matcher.match(line)).matchedPath);
  }
  
  const BUILD_TEST_OUPUT = true;
 
  const expected_1a_file = 'test/geojson/sf_centerlines.sample.out.geojson';
  if(BUILD_TEST_OUPUT) {
    var expected_1a_out:string = JSON.stringify(matchedLines);
    fs.writeFileSync(expected_1a_file, expected_1a_out);
  }
 
  const expected_1a_in = fs.readFileSync(expected_1a_file);
  const expected_1a:{} = JSON.parse(expected_1a_in.toLocaleString());
 
  //var matches_1a = await matcher.matchFeatureCollection(lines);
  
 };

 graph_test();