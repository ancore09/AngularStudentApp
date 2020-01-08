const express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;
const MongoClient = require('mongodb').MongoClient;

var News = [
  {title: 'Third New',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
        'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum',
    epilogue: 'Once Told me3'},
  {title: 'Second New',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
        'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum',
    epilogue: 'Once Told me2'},
  {title: 'First New',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
        'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum',
    epilogue: 'Once Told me1'}
];

var Table = [
  {id: 0,
    date: '10.10.10',
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    homework: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    mark: 0,
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum'},
  {id: 1,
    date: '10.10.13',
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    homework: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    mark: 0,
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum'},
  {id: 2,
    date: '10.11.10',
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    homework: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
        'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    mark: 0,
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
        'qui officia deserunt mollit anim id est laborum'}
];

var Users = [
  {login: 'some', password: 'body', nick: 'once', marks: [{id: 0, mark: 5}, {id: 1, mark: 3}, {id: 2, mark: 4}]},
  {login: 'me', password: 'body', nick: 'ME', marks: [{id: 0, mark: 5}, {id: 1, mark: 9}, {id: 2, mark: 4}]},
  {login: 'boy', password: 'body', nick: 'TOLDME', marks: [{id: 0, mark: 10}, {id: 1, mark: 2}, {id: 2, mark: 4}]},
  {login: '1', password: '1', nick: 'qwerty', admin: true}
];

var Messages = [];

// app.use(function (req, res, next) {
//
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//
//   // Pass to next layer of middleware
//   next();
// });

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/', function(req, res){
  res.send("HELLO");
});

app.get('/getNews', (req, res) => {
  res.send(JSON.stringify(News));
});

app.post('/addNew', (req, res) => {
  News.unshift(req.body);
});

app.get('/getTable', (req, res) => {
  res.send(JSON.stringify(Table));
});

app.get('/getUserMarks', (req, res) => {
  var login = req.query.login;
  res.send(Users.find( user => user.login == login).marks)
})

app.put('/changeClass', (req, res) => {
  var id = req.query.id;
  var type = req.body.type;
  var data = req.body.data;
  console.log(id);
  console.log(type);
  console.log(data);
  switch (type) {
    case 'date':
      Table.find( lesson => lesson.id == id).date = data;
      break;
    case 'theme':
      Table.find( lesson => lesson.id == id).theme = data;
      break;
    case 'comment':
      Table.find( lesson => lesson.id == id).comment = data;
      break;
    case 'homework':
      Table.find( lesson => lesson.id == id).homework = data;
      break;
  }
});

app.post('/addClass', (req, res) => {
  Table.push(req.body);
  Users.forEach( user => {
    if (user.login != '1') {
      user.marks.push({id: user.marks.length, mark: 0});
    }
  });
});


app.get('/authUser', (req, res) => {
  var login = req.query.login;
  var password = req.query.pass;
  var user = Users.find(user => user.login == login && user.password == password);
  if (user) {
    res.send(user);
  } else {
    res.send(false);
  }
});

app.get('/getUsers', (req, res) => {
  var response = Users.slice(0)
  response.pop();
  res.send(JSON.stringify(response));
});

app.put('/putMark', (req, res) => {
  var id = req.body.id;
  var data = req.body.data;
  var login = req.body.login;
  Users.find(user => user.login === login).marks.find(mark => mark.id === id).mark = data;
});

app.get('/getMessages', (req, res) => {
  res.send(JSON.stringify(Messages));
});

io.use((socket, next) => {
  let room = socket.handshake.query.room;
  return next();
});

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
      Messages.push(message);
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
