let socket = require('socket.io-client')('http://localhost:3001?user_id=5b99f43150fd6337a440817d&client_id=5b99f43150fd6337a440817e&socket_id=12345678');
socket.on('connect', function(){
    console.log('connected...');
    
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});