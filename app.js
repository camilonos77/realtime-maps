var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = module.exports = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


app.configure(function(){
    app.set('views', __dirname + '/views' );
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname , '/public')));
});

//var NODE_ENV = 'development';
//app.configure('development', function(){app.use(express.errorHandler({dumpExceptions: true,showStack: true}));});

app.get('/', function(req , res){
    res.render('layout', {
                            title: 'My GeoLoc Map',
                            description: 'This is my first GeoLoc map'
                         }
    );
});

io.sockets.on('connection', function(socket){
    socket.on('myLoc', function(data){
        //console.log('Incominggggggggggg:  ');
        console.log(data);
        socket.broadcast.emit('usrsLoc', data);
    });
});

server.listen(8080, function(){
    console.log('Express running at localhost on port 8080   ... ');
});
