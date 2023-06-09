const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const app = express();
const url = require('./secret.js');

app.use(bodyParser.json());

const client = new MongoClient(url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

client.connect(err =>{
    const myDB = client.db('people').collection('friends');
    app.route('/users')
    .get((req, res)=>{
        myDB.find().toArray().then(results => {
            console.log(results);
            res.contentType('application/json');
            res.send(JSON.stringify(results))
        })
    })
    .post((req, res)=>{
        console.log("Users List",req.body);
        myDB.insertOne(req.body).then(results=>{
            console.log("Users List",req.body);
            res.contentType('application/json');
            res.send(JSON.stringify(req.body))
        })

    })
    .put((req, res)=>{
        console.log("updated", req.body);
        myDB.findOneAndUpdate(
            {
                _id:ObjectId(req.body._id)
            },
            {$set:{
                name:req.body.name 
            }},
            {
                upsert: false
            }).then(results=>{
            
            res.contentType('application/json');
            res.send({"status":true})
        })
        
    })
    .delete((req, res)=>{
        
    })
})

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/public/index.html');
})

app.listen(8080, ()=>{
    console.log('server ready');
})

module.exports = app;