const expect = require('chai').expect,
    request = require('supertest'),
    basicSetup = require('../basicSetup'),
    app = require('./app');

const Student = require('../../models/student')
const { beforeEach, afterEach } = require('mocha');
const mongooseConnect = require('../../db/index');
const mongoose = require('mongoose');


async function dropAllCollections() {
    console.log('Clearing database')
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
            console.log('Cleared database')
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



describe('POST: /save route to insert data', () => {
    //basicSetup();         // imported from test/helpers/basicSetup.js

    before((done) => {
        console.log('starting tests')       // runs before each test case
        before(require('mongodb-runner/mocha/before'));
        mongooseConnect.dbconnect().finally(() => done())


    })

    after((done) => {
        console.log('closing test')
        after(require('mongodb-runner/mocha/after'));
        dropAllCollections().finally(() => mongooseConnect.dbclose().finally(() => done()))


    })


    it('has a module', (done) => {
        expect(Student).to.be.not.null
        done()
    })

    it('saves a new Student', async (done) => {
        const student = new Student({ name: 'Joe', branch: 'John' })
        await student.save()
        await Student.findOne({ name: 'Joe' }).finally(() => {
            const expected = 'Joe'
            const actual = foundStudent.name
            expect(actual).to.equal(expected)
            done()

        })

    })



    it('return all Students', (done) => {
        request(app).get('/students')
            .then((res) => {
                console.log(res)
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('Array')
                done()
            })
            .catch((err) => done(err))
    })

    it('valid data being added', (done) => {            // test case 1
        let toSendData = { name: 'john doe', branch: 'computer science' }
        request(app).post('/save')
            .send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.include(toSendData);
                done();
            })
            .catch((err) => {
                console.log('Error being given is:', err)
                done(err)
            })
    })

    it('no _id field given', (done) => {        // test case 2
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