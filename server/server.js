const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

//const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});

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

// User

app.get('/authUser', (req, res) => {
    const login = req.query.login;
    const password = req.query.pass;
    const course = req.query.course;

    console.log(login);
    console.log(password);
    console.log(course);

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
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

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('users');
        collection.find().toArray((error, result) => {
            if (error) console.error(error);
            if (result) {
                result.pop();
                res.send(result);
            }
            client.close();
        });
    });
});

// News

app.get('/getNews', (req, res) => {
    const course = req.query.course;

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
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

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('news');
        collection.insertOne(req.body, (error) => {
           if (error) console.error(error);
           client.close();
        });
    });
});

// Journal

app.get('/getTable', (req, res) => {
    const course = req.query.course;

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
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

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        var collection = db.collection('table');
        collection.insertOne(req.body, (error) => {
            if (error) return console.error(error);
            collection = db.collection('users');
            collection.findOne({}, (err, resId) => {
                if (err) return console.error(err);
                collection.updateMany({admin: false}, {$push: {marks: {id: resId.marks.length, mark: 0}}});
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
    console.log(type);
    console.log(data);
    console.log(id);

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('table');
        collection.findOneAndUpdate({id: Number(id)}, {$set: {[type]: data}}, error => {
            if (error) return console.log(error);
            client.close();
        });
    });
});

app.put('/putMark', (req, res) => {
    const id = req.body.id;
    const course = req.query.course;
    const data = req.body.data;
    const login = req.body.login;

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('users');
        collection.update({login: login}, {$set: {'marks.$[element].mark': Number(data)}}, {multi: false, arrayFilters: [{'element.id': Number(id)}]}, error => {
            if (error) console.error(error);
            client.close();
        });
    });
});

// Chat

app.get('/getMessages', (req, res) => {
    const course = req.query.course;

    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('messages');
        collection.find().toArray((error, result) => {
             if (error) console.error(error);
             res.send(result);
             client.close();
        });
    });
});

function saveMessage(msg, course) {
    const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
    mongoClient.connect((err, client) => {
        if (err) return console.error(err);
        const db = client.db(course);
        const collection = db.collection('messages');
        collection.insertOne(msg, error => {
            if (error) console.error(error);
            client.close();
        });
    });
}

io.use((socket, next) => {
    let room = socket.handshake.query.room;
    return next();
});

let Messages = [];

io.on('connection', function(socket) {
    let room = socket.handshake.query.room;
    console.log(room);
    socket.join(room);
    console.log("connected");
    socket.on('message', function(message) {
        // message = message.replace('"', '');
        // message = message.replace('"', '');
        io.in(room).emit('message', {type: room, body: message});
        console.log(message);
        // Messages.push(message);
        saveMessage(message, room);
    });

    socket.on('disconnect', function() {
        console.log("disconnected");
        socket.leave(room);
    });

    socket.on('leave', function () {
        socket.leave(room);
    });
});

http.listen(port, function(){
    console.log('listening on localhost:' + port);
});
