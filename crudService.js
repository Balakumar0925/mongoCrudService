var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/";
module.exports={
    createDoc(data){
        return new Promise (function(resolve,reject){
           MongoClient.connect(url,function(err,connection){
               if (err) {
                     console.log(err);
               }
               var mongodb = connection.db('bala123');
               var collection = mongodb.collection('documents');
               collection.insertOne(data).then(function(bala){
                   console.log('doc created');
                   resolve(bala.ops[0]._id);
               }).catch(function (err){
                   console.log(err);
                   reject(err);
               });
           });
        });
    },
    createMany(data){
        return new Promise(function(resolve,reject){
          MongoClient.connect(url,function(err,connection){
              if(err) {
                  console.log(err);
              }
              var mongodb = connection.db('bala123');
              var collection = mongodb.collection('documents');
              collection.insertMany(data).then(function(dbresponse){
                  console.log('doc created');
                  resolve(dbresponse.insertedIds);
                   }).catch(function(err){
                  console.log(err);
              });
          });
        });
    }
}