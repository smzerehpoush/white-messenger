const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.post('/', async (req, res) => {
    let user = await User
        .checkUser(req.body.phoneNumber)
    res.send(user)
})

router.post('/auth', async (req, res) => {
    let phoneNumber = req.body.phoneNumber
    let user = await User.checkUser(phoneNumber)
    if (!user) {
        user = register(phoneNumber)
    }
    if (user) {
        let code = generateVerificationCode(4)
        let result = await User.updateOne({ _id: user._id }, {
            $set: {
                verification: { code, date: Date.now() }
            }
        })
        if (result.ok)
            res.json({ code })
    }

})
            phoneNumber,
            username: phoneNumber
        })
        User.addUser(user, (err) => {
            if (err)
                console.log('failed to create user :', err)
            else {
                res.send(user)
            }
        })
    }

})


}
router.post('/login', async function (req, res) {
    let phoneNumber = req.body.phoneNumber
    let code = req.body.verificationCode
    let user = await User.findOne({ phoneNumber })
    if (parseInt(user.verification.code) === code) {
        let result = await User.updateOne({ _id: user._id }, {
            $set: {
                verification: {}
            }
        })
        if (result.ok)
            res.json({ "id": user._id })
    }
    
})

function generateVerificationCode(digit = 4) {
    return Math.floor(Math.pow(10, digit) - Math.random() * Math.pow(10, digit - 1))
}
module.exports = router