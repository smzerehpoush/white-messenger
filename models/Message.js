const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    // file:{
    //     type:String
    // },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})