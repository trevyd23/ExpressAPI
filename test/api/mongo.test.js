// const { MongoClient } = require('mongodb');
// const expect = require('chai').expect

// describe('insert', () => {
//     let connection;
//     let db;

//     beforeEach(async (done) => {
//         connection = await MongoClient.connect(global.__MONGO_URI__, {
//             useNewUrlParser: true,
//         });
//         db = await connection.db(global.__MONGO_DB_NAME__);
//         done()
//     });

//     afterEach(async (done) => {
//         await connection.close();
//         await db.close();
//         done()
//     });

//     it('should insert a doc into collection', async () => {
//         const users = db.collection('users');

//         const mockUser = { _id: 'some-user-id', name: 'John' };
//         await users.insertOne(mockUser);

//         const insertedUser = await users.findOne({ _id: 'some-user-id' });
//         expect(insertedUser).toEqual(mockUser);
//     });
// });