var fs = require('fs');
var http = require('http').createServer(function (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

var io = require('socket.io')(http);
var y_data = [];
y_data.length = 200;
y_data.fill(0)

var t = 0
var x_data = [];
x_data.length = 200;
x_data.fill(0);

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	setInterval(function(){
		let new_val = Math.random();
		x_data.push(t++);
		x_data.shift();
		y_data.push(new_val);
		y_data.shift();
		io.emit('chat message', {
			y: y_data,
			x: x_data	
		});

		// console.log({x:x_data, y:y_data}.toString())
	}, 100);
});


http.listen(3000, function() {
	console.log('listening on *:3000');
});
