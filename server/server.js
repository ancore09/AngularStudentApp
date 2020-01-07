const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Everything connected with user

app.get('/authUser', (req, res) => {
    const login = req.query.login;
    const password = req.query.pass;
    const course = req.query.course;

    mongoClient.connect((err, client) => {
       if (err) return console.error(err);
       const db = client.db(course);
       const collection = db.collection('users');
       collection.findOne({login: login, password: password}, (error, result) => {
           if (err) console.error(error);
           res.send(result);
           client.close();
       });
    });
});

app.get('/getUsers', (req, res) => {
    const course = req.query.course;
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('users');
        collection.find().toArray((error, result) => {
            if (error) console.error(error);
            res.send(result);
            client.close();
        });
    });
});

// NEWS

app.get('/getNews', (req, res) => {
    const course = req.query.course;
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('news');
        collection.find().toArray((error, result) => {
            if (error) console.error(error);
            res.send(result);
            client.close();
        });
    });
});

app.post('/addNew', (req, res) => {
    const course = req.query.course;
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('users');
        collection.insertOne(req.body, (error) => {
           if (error) console.error(error);
           client.close();
        });
    });
});

// Journal

app.get('/getTable', (req, res) => {
    const course = req.query.course;
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('table');
        collection.find().toArray((error, result) => {
            if (error) console.error(error);
            res.send(JSON.stringify(result));
            client.close();
        });
    });
});

app.post('/addClass', (req, res) => {
    const course = req.query.course;
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        var collection = db.collection('table');
        collection.insertOne(req.body, (error) => {
            if (error) return console.error(error);
            collection = db.collection('users');
            collection.findOne({}, (err, resId) => {
                if (err) return console.error(err);
                collection.update({}, {$push: {marks: {id: resId.marks.length, mark: 0}}});
                client.close();
            });
        });
    });
});

app.put('/changeClass', (req, res) => {
    const id = req.query.id;
    const course = req.query.course;
    const type = req.body.type;
    const data = req.body.data;

    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('table');
        collection.updateOne({id: id}, {$set: {[type]: data}}, error => {
            if (error) return console.log(error);
            client.close();
        });
    });
});













io.on('connection', function(socket) {
    socket.on('message', function(message) {
        io.emit('message', {type: 'new=message', body: message});
        console.log(message);
        // Message saving
    });

    // socket.on('disconnect', function() {
    //     console.log("disconnected");
    // });
});

http.listen(port, function(){
    console.log('listening on localhost:' + port);
});
