const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const User = require('./models/User')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/meineme', {
        useNewUrlParser: true
    })
    .then(() => console.log('connected to db...'))
    .catch((err) => console.log('failed to connect to db : ', err))


io.use(async function (socket, next) {

    let userId = socket.request._query['user_id']
    //check objectId
    let isValid = mongoose.Types.ObjectId.isValid(userId)
    //check socketId
    const socketId = socket.request._query['socket_id']
    isValid = isValid & socketId
    if (!isValid)
        next()
    //check mac addr
    const mac = socket.request._query['mac']
    console.log(userId)
    let user = await User.findOne({
        _id: userId
    })
    user.clients.forEach(async function (client) {
        if (client.mac === mac)
            client.socketId = socketId
    })
    let result = await user.save()
    console.log(result)

    next()
})


// io.on('connection', function (socket) {
//     // console.log(socket.id, 'connected')



//     socket.on('disconnect', function () {
//         console.log('-:  user', socket.id, ' disconnected ...')
//     })
// })
const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
});