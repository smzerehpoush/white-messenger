const mongoose = require('mongoose')

const channelMessagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'User'
    }
    , reciever: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'Channel'
    }
    , message: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'Message'
    }
})

const ChannelMessages = mongoose.model('ChannelMessages',channelMessagesSchema)
module.exports = ChannelMessages