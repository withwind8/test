var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var users=[];

io.on('connection',function(socket){
	var name="";
	console.log('a user connected');
	//io.emit('sys message','a user connected');
	socket.on('disconnect', function(){
		console.log(name + ' disconnected');
		var index=-1;
		for(var i=0;i<users.length;i++){
			if(users[i]==name){
				index=i;
				break;
			}
		}
		if(index!=-1){
			users.splice(index,1);
		}
		io.emit('logout',name);
	});
	socket.on('chat message', function(msg){
		console.log(name + ' : '+ msg);
		socket.broadcast.emit('chat message',{
			name:name,
			msg:msg
		});
	});
	socket.on('name message', function(msg){
		name=msg;
		console.log(name + " login");
		socket.emit('users',users);
		users.push(name);
		io.emit('login',name);
	});
	socket.on('typing', function(){
		console.log(name + "  typing");
		socket.broadcast.emit('typing',name);
	});
	socket.on('typing end', function(){
		console.log(name + "  typing end");
		socket.broadcast.emit('typing end',name);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});