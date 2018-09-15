const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    firstName: String,
    lastName: String,
    profilePhoto: [{
        type: String
    }],
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    clients: [{
        os: {
            type: String,
            required: true
        },
        sourceIp: {
            type: String
            // , required: true
        },
        mac: {
            type: String
                // unique: true,
                ,
            required: true
        },
        country: {
            type: String
            // , required: true
        },

        socketId: {
            type: String,
            required: true,
            default: ''

        }
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastSeen: {
        type: Date
    },
    isActive: {
        type: Boolean
    },
    verification: {
        code: String,
        date: Date
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
module.exports.addUser = async (user, callback) => {
    User.create(user, callback)

}
module.exports.checkUser = async function (phoneNumber) {
    return await User
        .findOne({
            phoneNumber
        })
        .select({
            _id: 1
        })

}