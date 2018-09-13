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
    let isValid = true
    if (userId)
        isValid = mongoose.Types.ObjectId.isValid(userId)
    else
        isValid = false
    //check socketId
    const socketId = socket.request._query['socket_id']
    isValid = isValid & (socketId !== undefined)
    //check mac addr
    const clientId = socket.request._query['client_id']
    if (clientId)
        isValid = isValid & mongoose.Types.ObjectId.isValid(clientId)
    if (isValid) {
        let user = await User.findOne({
            _id: userId
        })
        user.clients.forEach(async function (client) {
            if (client._id.toString() === clientId) {
                client.socketId = socketId
            }
        })
        let result = await user.save()
        console.log(result)

        next()
    } else {
        next()
    }

})


io.on('connection', function (socket) {
    console.log(socket.id, 'connected')

    socket.on('disconnect', function () {
        console.log('-:  user', socket.id, ' disconnected ...')
    })
})

const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
});