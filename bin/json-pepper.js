#!/usr/bin/env node
var jsonPepper= require('../index.js'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2))._;


// read from file if provided
// otherwise read from stream

if(argv.length > 0){
  console.log(jsonPepper(JSON.parse(fs.readFileSync(argv[0]))));
} else {
  var concat = require('concat-stream');
  process.stdin.pipe(concat(function (body) {
    console.log(jsonPepper(JSON.parse(body)));
  }));
}
