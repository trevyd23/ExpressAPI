const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

router.post('/login', (req, res) => {
    const { email, password } = req.body;


    User.findOne({ email })
        .then(user => {
            //Validate Password
            bCrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Invalid Username or Password Entered' })
                    } else {
                        jwt.sign(
                            {
                                id: user._id,
                                name: user.username
                            },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    token: token,
                                    user: {
                                        id: user._id,
                                        name: user.username,
                                    }
                                }
                                )
                            })
                    }
                })

        })
        .catch(err => res.status(404).json({ message: 'User does not exist' }))


});

module.exports = router;