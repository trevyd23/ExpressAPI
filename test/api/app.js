const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    authMiddleware = require('../../middleware/AuthMiddleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const mongooseConnect = require('../../db/index');


// mongooseConnect.dbconnect()
//     .then(() => console.log('Successfully connected to db'))
//     .catch((err) => console.log('Eroor con to db', err))



const Student = require('../../models/student')
const User = require('../../models/user')

app.get('/students', (req, res) => {
    Student.find()
        .then(students => {
            res.status(200)
            res.json(students)
        })
        .catch(err => res.status(400).send(err))
})

app.get('/users', authMiddleware, (req, res) => {
    User.find()
        .then(users => {
            res.status(200)
            res.json(users)
        })
        .catch(err => res.status(400).send(err))
})

app.post('/save', (req, res) => {
    new Student(req.body)
        .save()
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(400).send(err))
})

app.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then((data) => {
            if (data) {
                res.status(200).send(data)
            } else {      // query returned null
                res.status(404).send({ err: "data not found" })
            }
        })
        .catch((err) => res.status(500).send(err))
})

app.post('/newUser', (req, res) => {
    new User(req.body)
        .save()
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(400).send(err))
})

app.listen(3000, () => console.log("Test server started at port 3000"))

module.exports = app;
