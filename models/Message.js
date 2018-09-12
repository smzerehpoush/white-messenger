const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    file: {
        type: String
    },
    fileType: {
        type: String,
        enum: ['mp3', 'mp4', 'file', 'voice']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})