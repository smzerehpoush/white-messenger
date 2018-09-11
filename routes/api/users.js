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


module.exports = router