var  bodyParser = require('body-parser');
var express = require('express');
var app = express();
var dbclient = require('./crudService');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json(true));
app.use(express.static('public'));

/*var sample = {
    name:req.body.name
};
var updateall ={
    $set:{"salary":"20000"}
};
var createOnNoDocErr = {
    upsert: true
};*/


app.post('/create',function(req,res){
    console.log('null',req.body);
    dbclient.createDoc(req.body).then(function(call){
    console.log(call);
    res.send({'result':'data created'});
    
}).catch(function(err){
    console.log(err);
});
});


app.post('/addmany',function(req,res){
    console.log('1st line');
    console.log('server', req.body);
dbclient.createMany(req.body).then(function(docs){
    //console.log(req.body);
    console.log(docs);
    //res.send(docs).status(201);
    res.status(201).send(docs);
   // res.sendStatus(201).send(docs);
}).catch(function(err){
    console.log(err);
});
});


app.delete('/delete', function(req,res){

    dbclient.deleteMany(req.body).then(function(deldata){
    console.log(deldata);
    res.send(deldata);
}).catch(function(err){
    console.log(err);
});
});
app.post('/update',function(req,res){
    var sample = {
        'name': req.body[0].name
    };
    var replaceWith = req.body[1].changes;
    let createOnNoDocErr = req.body[2];
dbclient.updateData(sample,replaceWith,createOnNoDocErr).then(function(update){
    console.log(update);
}).catch(function(err){
    console.log(err);
});
});

app.get('/view' ,function(req,res){
    console.log(req.body);
dbclient.findData(req.body).then(function(show){
    res.send(show);
    console.log(show);
}).catch(function(err){
    console.log(err);
});
});
app.listen(8000,function(req,res){
    console.log('server start');
});