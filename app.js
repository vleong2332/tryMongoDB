var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/tryMongoDB';

MongoClient.connect(url, function(err, db) {
   assert.equal(null, err);
   console.log("Connected correctly to server " + url);
   db.close();
});