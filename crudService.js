var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/";
module.exports={
    createDoc(data){
        return new Promise (function(resolve,reject){
           MongoClient.connect(url,function(err,connection){
               if (err) {
                     console.log(err);
                     reject(err);
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
                  reject(err);
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
    },
    deleteMany(data){
        return new Promise(function(resolve,reject){
           MongoClient.connect(url,function(err,connection){
               if(err) {
                   console.log(err);
                   reject(err);
                    }               
               var mongodb = connection.db('bala123');
               var collection = mongodb.collection('documents');
              collection.deleteMany(data).then(function(data){
                  console.log('doc deleted');
                  resolve('we have matched ' + data.deletedCount + ' documnets and hence we deleted ' + data.deletedCount);
              }).catch(function(err){
                  console.log(err);
                  reject(err);
              });
           });
        });
    },
     updateData(data,update,upsert){
         console.log(upsert);
         console.log(typeof(upsert));
         return new Promise(function(resolve,reject){
             MongoClient.connect(url,function(err,connection){
                 if(err){
                     console.log(err);
                     reject(err);
                 }
                 var mongodb = connection.db('bala123');
                 var collection = mongodb.collection('documents');
                 collection.updateMany(data,update,upsert).then(function(data){
                     console.log(data)
                     if (upsert.upsert) {
                         console.log('new data created');
                         resolve(data.upsertedId._id);
                     }else{
                         resolve(data.modifiedCount);
                     }
                 }).catch(function(err){
                     reject(err);
                 });
             });
         });
     },
     findData (data){
         return new Promise (function(resolve,reject){
             MongoClient.connect(url,function(err,connection){
                 if(err) {
                     console.log(err);
                     reject(err);
                 }
                 var mongodb = connection.db('bala123');
                 var collection = mongodb.collection('documents');
                 var finddatas = [];
                 collection.find(data).forEach(function(read){
                     finddatas.push(read);
                    resolve(finddatas);
                 }).then(function(data){
                    resolve('find documents');
                 }).catch(function(err){
                     console.log(err);
                     reject(err);
                 });
             });
         });
     }
};