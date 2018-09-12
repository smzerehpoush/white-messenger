const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let userCount = 0
io.on('connection', function(socket){
    console.log('+: a user connected ...',socket.id)
    userCount++
    socket.emit('newUser',{description:'Welcome!'})
    socket.broadcast.emit('newUser',{description:'user count '+userCount})
    socket.on('testing',function(){
        io.sockets.emit('broadcast',{description:'user count '+userCount})
        socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
    })
    socket.on('test2',function(data){
        io.sockets.emit('test2', data)
        // socket.send('test2')
    })
    
    socket.on('disconnect',function(){
        userCount--
        io.sockets.emit('broadcast',{description:'a user lef.number of users : '+userCount})
        console.log('-: a user disconnected ...')
    })
})
const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
}); 