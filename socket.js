const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

const User = require('./models/User')
const Message = require('./models/Message')
const PrivateChat = require('./models/PrivateChat')

mongoose.connect('mongodb://localhost:27017/white_messenger', {
        useNewUrlParser: true
    })
    .then(async () => console.log('connected to db...'))
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
    // console.log(isValid)
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
        // console.log(result)

        next()
    } else {
        next()
    }

})
const chat = io
    // .of('/chat')
    .on('connection', async function (socket) {
        console.log(socket.id, 'connected')
        socket.on('sendPrivateMessage', async function (data) {
            let receiverId = data.receiverId
            if (mongoose.Types.ObjectId.isValid(receiverId)) {
                message = await new Message({
                        text: data.text
                    })
                    .save()

                let senderId = await User.findOne({
                    'clients.socketId': socket.id
                }, {
                    _id: 1
                })
                privateChat = await new PrivateChat({
                        message: message._id,
                        sender: senderId,
                        receiver: receiverId
                    })
                    .save()
                // console.log('senderId', senderId)
                // console.log('receiverId', receiverId)

                sendDataToUser(socket, receiverId, 'receivePrivateMessage', data.text)
        socket.on('sendIsTyping', async function (data) {
            const userId = mongoose.Schema.Types.ObjectId.isValid(data.userId) ? data.userId : null
            const receiverId = mongoose.Schema.Types.ObjectId.isValid(data.receiverId) ? data.receiverId : null
            if (userId & receiverId) {
                sendDataToUser(socket,receiverId,'receiveIsTyping',{userId})
            }
        })
        socket.on('disconnect', function () {
            console.log('-:  user', socket.id, ' disconnected ...')
        })
async function sendDataToUser(socket, receiverId, eventName, data) {
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
        // console.log('client ', i + 1, ' : ', clients[i].socketId)
        // console.log(data.text)
        socket.to(clients[i].socketId).emit(eventName, data)
    }
}
const port = 3001
http.listen(port, () => {
    console.log('Server is listening on port ', port);
});