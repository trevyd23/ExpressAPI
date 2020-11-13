const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../../middleware/AuthMiddleware')

const User = require('../../models/user');

router.post('/register/user', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ message: 'User already exists in our system' })
            }
            bCrypt.genSalt(10, (err, salt) => {
                bCrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {
                                    id: user._id,
                                    name: user.username
                                },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(201).json({
                                        token: token,
                                        user: {
                                            id: user._id,
                                            name: user.username,
                                            email: user.email,
                                            RegisteredOn: user.registeredDate
                                        }
                                    }
                                    )
                                })
                        })
                        .catch(err => {
                            res.status(400).json({ message: 'Failed to register user' })
                        })
                })
            })
        })

});

router.get('/user-info', authMiddleWare, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            userData = {
                id: user._id,
                username: user.username,
                email: user.email,
                RegisteredOn: new Date(user.registeredDate).toLocaleString()
            }
            res.status(200).json(userData)
        });
});

module.exports = router;