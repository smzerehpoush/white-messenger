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
router.post('/login', async (req, res) => {

    let user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (!user) {

        res.send('token')
    }
    else {
        res.status(400).send('user not exists')
    }
})


function generateVerificationCode(digit = 4) {
    return Math.floor(Math.pow(10, digit) - Math.random() * Math.pow(10, digit - 1))
}
module.exports = router