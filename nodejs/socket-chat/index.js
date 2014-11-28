var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var users=[];
var sockets = {};

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
	socket.on('chat message', function(data){
		console.log(name +' to '+ (data.to==''?'all':data.to) +' : '+ data.msg);
		if(sockets.hasOwnProperty(data.to)){
			sockets[data.to].emit('chat message',{
				name:name,
				msg:data.msg
			});
		}else{
			socket.broadcast.emit('chat message',{
				name:name,
				msg:data.msg
			});
		}
	});
	socket.on('name message', function(msg){
		name=msg;
		console.log(name + " login");
		socket.emit('users',users);
		users.push(name);
		sockets[name]=socket;
		io.emit('login',name);
	});
	socket.on('typing', function(to){
		console.log(name + "  typing to "+ (to==""?"all":to));
		if(sockets.hasOwnProperty(to)){
			sockets[to].emit('typing',name);
		}else{
			socket.broadcast.emit('typing',name);
		}
	});
	socket.on('typing end', function(to){
		console.log(name + "  typing end to " + (to==""?"all":to));
		if(sockets.hasOwnProperty(to)){
			sockets[to].emit('typing end',name);
		}else{
			socket.broadcast.emit('typing end',name);
		}
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});