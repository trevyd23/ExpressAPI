const expect = require('chai').expect,
    request = require('supertest'),
    app = require('./app');

const Student = require('../../models/student')
const User = require('../../models/user')
const mongooseConnect = require('../../db/index');
const mongoose = require('mongoose');


async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return

            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return

            console.log(error.message)
        }
    }
}



describe('Api integration tests', () => {
    //basicSetup();         // imported from test/helpers/basicSetup.js

    before((done) => {
        before(require('mongodb-runner/mocha/before'));
        mongooseConnect.dbconnect().finally(() => done())


    })

    after((done) => {
        after(require('mongodb-runner/mocha/after'));
        dropAllCollections().finally(() => mongooseConnect.dbclose().finally(() => done()))


    })


    it('student model has a module', (done) => {
        expect(Student).to.be.not.null
        done()
    })

    it('user model has a module', (done) => {
        expect(User).to.be.not.null
        done()
    })


    it('creates a user in the database', (done) => {
        const dataToSend = { username: 'tre', password: 'tretre', email: 'tre@gmail.com' }
        request(app).post('/newUser')
            .send(dataToSend)
            .then((res) => {
                expect(res.statusCode).to.equal(201)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch((err) => done(err))

    })

    it('should send a 403 error trying to get the users', (done) => {
        request(app).get('/users')
            .then((res) => {
                expect(res.status).to.equal(403)
                done()
            })
            .catch((err) => done(err))
    })

    it('should return 401 at users endpoint once incorrect token is provided', (done) => {
        request(app).get('/users')
            .set('Authorization', 'abc123')
            .then((res) => {
                expect(res.status).to.equal(401)
                expect(res.json).to.not.be.null
                done()
            })
            .catch((err) => done(err))
    })

    it('return all Students', (done) => {
        request(app).get('/students')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('Array')
                done()
            })
            .catch((err) => done(err))
    })

    it('valid data being added to add student endpoint', (done) => {            // test case 1
        let toSendData = { name: 'john doe', branch: 'computer science' }
        request(app).post('/save')
            .send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.include(toSendData);
                done();
            })
            .catch((err) => {
                done(err)
            })
    })

    it('no _id field given to add student endpoint', (done) => {        // test case 2
        request(app).post('/save')
            .send({ branch: 'computer science' })
            .then((res) => {
                expect(res.statusCode).to.equal(400)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch((err) => done(err))
    })
})