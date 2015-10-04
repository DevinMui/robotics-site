var express = require('express');
var app = express();
var socket = require('socket.io');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/gaelforce';
app.use("/bootstrap", express.static(__dirname + '/bootstrap'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/file.html');
});

var server = app.listen(8080);
var io = socket.listen(server);

io.sockets.on('connection', function(client){
	console.log("Connected");
	client.on('submit', function(u, p, t){
		if(p == "gaelforce"){
			MongoClient.connect(url, function(err, db){	
				var collection = db.collection('entries');
				collection.insertOne({"user" : u, "entry" : t}, function(err, result){});
			});
		}
	});
});
