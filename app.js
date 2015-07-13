var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/tryMongoDB';

var insertDocs = function(db, callback) {
   // Get the doc collection
   var collection = db.collection('meaow');
   collection.insert([
      {a: 1},
      {a: 2},
      {a: 3}
   ],
   function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log('Inserted documents into the meaow collection');
      callback(result);
   });
};

var updateDoc = function (db, callback) {
   // Get the doc coll
   var collection = db.collection('meaow');
   collection.update({a: 2}, {$set: {b: 1}}, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log('Updated the document with the field a equals to 2');
      callback(result);
   })
};

var removeDoc = function(db, callback) {
   // Get the doc coll
   var collection = db.collection('meaow');
   // Remove doc
   collection.remove({a: 3}, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the doc with the field a equals to 3");
      callback(result);
   });
};

var findDocs = function(db, callback) {
   var collection = db.collection('meaow');
   collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      // assert.equal(2, docs.length);
      console.log('Found the following records');
      console.dir(docs);
      callback(docs);
   });
};

MongoClient.connect(url, function(err, db) {
   assert.equal(null, err);
   console.log("Connected correctly to server " + url);
   insertDocs(db, function() {
      updateDoc(db, function() {
         removeDoc(db, function() {
            findDocs(db, function() {
               db.close();
               console.log('Connection closed');
            });
         });
      });
   });
});