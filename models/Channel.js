const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        message:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]
})

const Channel = mongoose.models('Channel', channelSchema)
module.exports = Channel