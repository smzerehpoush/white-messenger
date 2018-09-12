const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const User = require('./models/User')


io.use(async function(socket,next) {

    const userId = socket.request._query['user_id']
    const socketId = socket.request._query['socket_id']
    const mac = socket.request._query['mac']
    
    const user = await User.findById(userId)
    if(user){
        console.log(user)
    }
    console.log(req)
    next()
})


io.on('connection', function(socket){
    console.log(socket.id, 'connected')
    

    
    socket.on('disconnect',function(){
        console.log('-:  user',socket.id,' disconnected ...')
    })
})
const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
}); 