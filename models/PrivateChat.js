const mongoose = require('mongoose')

const privateChatSchema = new mongoose.Schema({
    message: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'Message'
    }
    , sender: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'User'
    }
    , reciever: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'User'
    }
})

const PrivateChatSchema = mongoose.model('PrivateChat', privateChatSchema)
module.exports = PrivateChatSchema