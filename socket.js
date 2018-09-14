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

function getDataFromInputSocket(socket) {
    let userId = socket.request._query['user_id']
    //check userId
    let isValid
    isValid = userId ? mongoose.Types.ObjectId.isValid(userId) : false
    //check clinetId
    const clientId = socket.request._query['client_id']
    if (clientId)
        isValid = isValid & mongoose.Types.ObjectId.isValid(clientId)
    return {
        isValid,
        userId,
        clientId,
        socketId: socket.id
    }
}
io.use(async function (socket, next) {
    const {
        isValid,
        userId,
        clientId,
        socketId
    } = getDataFromInputSocket(socket)
    console.log(isValid)
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

        next()
    } else {
        next()
    }

})
const chat = io
    // .of('/chat')
    .on('connection', async function (socket) {
        console.log(socket.id, 'connected')
        socket.to(socket.id).emit('receivePrivateMessage', 'salamm!')
        socket.on('sendPrivateMessage', async function (data) {
            let receiverId = data.receiverId
            if (mongoose.Types.ObjectId.isValid(receiverId)) {
                let {
                    clients
                } = await User.findOne({
                        _id: receiverId
                    }, {
                        _id: 0,
                        clients: 1
                    })
                    .select({
                        'clients.socketId': true
                    })
                for (let i = 0; i < clients.length; i++) {
                    console.log('client ', i + 1, ' : ', clients[i].socketId)
                    socket.to(clients[i].socketId).emit('receivePrivateMessage', data.data)
                }
            }
        })
        socket.on('disconnect', function () {
            console.log('-:  user', socket.id, ' disconnected ...')
        })
    })

const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
});