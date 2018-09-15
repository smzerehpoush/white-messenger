const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
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
    seen: {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message