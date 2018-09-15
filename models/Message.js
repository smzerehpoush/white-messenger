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
    }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message