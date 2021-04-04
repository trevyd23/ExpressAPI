const bCrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const registerUser = async (userName, requestEmail, password) => {
    let response = { status: 200, body: {} }

    const newUser = new User({
        username: userName,
        email: requestEmail,
        password: password
    });


    await User.findOne({ email: requestEmail })
        .then(async (initialuser) => {
            if (initialuser) {
                // response = { ...response, status: 400, body: { message: 'User already exists in our system' } }
                response.status = 400
                response.body = { message: 'User already exists in our system' }
                return response
            }

        })
        .catch(err => {
            response.status = 400
            response.body = { message: 'Failed to register user' }
            return response
        })
    return response
    // return ({ status: 500, body: { message: 'Failed to establish database logic' } })
}

const createUserToken = async (password, newUser) => {
    let encryptedUser = { status: 0, body: {} }

    const r = await bCrypt.genSalt(10, async (err, salt) => {
        const res = await bCrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err;
            password = hash;
            const result = await newUser.save()
                .then((user) => {
                    jwt.sign(
                        {
                            id: user._id,
                            name: user.username
                        },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            token
                        }
                    )
                    userDetails = {
                        token: token,
                        user: {
                            id: user._id,
                            name: user.username,
                            email: user.email,
                            registeredOn: user.registeredDate
                        }
                    }
                    return encryptedUser = { ...encryptedUser, status: 200, body: userDetails }
                }).catch(err => {
                    errorPayload = {
                        message: 'Error saving user to database',
                    }

                    return error = { status: 400, body: errorPayload }
                })
            return await result
        })
        const t2 = await res
        console.log('res has', res)
        return t2

    })
    const t3 = await r
    console.log('t3 has', t3)
    return t3

}

module.exports = { registerUser, createUserToken }

