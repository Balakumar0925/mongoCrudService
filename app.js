var express = require('express');
var app = express();
var dbclient = require('./crudService');
var sample = {
    name:'bala',
    age:'25'

};
var updateall ={
    $set:{"salary":"10000"}
};
/*dbclient.createDoc(sample).then(function(call){
    console.log(call);
}).catch(function(err){
    console.log(err);
});*/
/*dbclient.createMany(sample).then(function(docs){
    console.log(docs);
}).catch(function(err){
    console.log(err);
});*/
/*dbclient.deleteMany(sample).then(function(del){
    console.log(del);
}).catch(function(err){
    console.log(err);
});*/
dbclient.updateData(sample,updateall).then(function(update){
    console.log(update);
}).catch(function(err){
    console.log(err);
});
dbclient.findData(sample).then(function(find){
    console.log(find);
}).catch(function(err){
    console.log(err);
});