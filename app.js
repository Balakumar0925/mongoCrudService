var express = require('express');
var app = express();
var dbclient = require('./crudService');
var sample = [
   {      
        name: 'bala',
         age:'25'
  },
  {
      name:'abi',
      age:'28'
  }
];
/*dbclient.createDoc(sample).then(function(call){
    console.log(call);
}).catch(function(err){
    console.log(err);
});*/
dbclient.createMany(sample).then(function(docs){
    console.log(docs);
}).catch(function(err){
    console.log(err);
});