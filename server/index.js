const express = require('express');
var app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;
const MongoClient = require('mongodb').MongoClient;

app.get('/', function(req, res){
  res.send("HELLO");
});

app.get('/getMessages', (req, res) => {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
  mongoClient.connect(function(err, client) {
    if (err) return console.log(err);
    db = client.db('messages');
    collection = db.collection("messages");
    collection.find().toArray(function(err, messages) {
      if (err) return console.log(err);
      res.send(messages);
      client.close();
    });
  });
});

app.get('/getNews', (req, res) => {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
  mongoClient.connect(function(err, client) {
    if (err) return console.log(err);
    const db = client.db("newsdb");
    const collection = db.collection("news");
    collection.find().toArray(function(err, news) {
      if (err) return console.log(err);
      //console.log(news);
      res.send(news);
      client.close();
    });
  });
});

app.get('/getTable', (req, res) => {
  const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
  mongoClient.connect(function(err, client) {
    if (err) return console.log(err);
    var db = client.db("tabledb");
    var collection = db.collection("table");
    var theadRes;
    collection.find().toArray(function(err, thead) {
      if (err) return console.log(err);
      theadRes = thead;
    });

    db = client.db("userdb");
    collection = db.collection("users");
    collection.find().toArray(function(err, users){
      if (err) return console.log(err);
      var response = {
        users: users,
        thead: theadRes
      }
      res.send(response);
    });
    client.close();
  });
});

io.on('connection', function(socket) {
  console.log("connected");
    socket.on('message', function(message) {
      // message = message.replace('"', '');
      // message = message.replace('"', '');
      io.emit('message', {type: 'new=message', body: message});
      console.log(message); 
    });

    socket.on('disconnect', function() { 
      console.log("disconnected");
    });
});

http.listen(port, function(){
  console.log('listening on localhost:' + port);
});
