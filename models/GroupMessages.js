const mongoose = require('mongoose')

const groupMessagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'User'
    }
    , reciever: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'Group'
    }
    , message: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'Message'
    }
})

const GroupMessages = mongoose.model('GroupMessages',groupMessagesSchema)
module.exports = GroupMessages