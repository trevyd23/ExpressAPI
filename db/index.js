const mongoose = require('mongoose');
const DB_uri = "mongodb://localhost:27017/testingDB";


const dbconnect = async () => {
    await mongoose.connect(DB_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => { console.log('Connected to db') })
        .catch((err) => console.log('Error connecting to db', err))
    return mongoose.connection
}

const dbclose = async () => {
    return await mongoose.disconnect();
}

module.exports = { dbconnect, dbclose };
// const mongoose = require('mongoose');

// //Connect to Mongo
// const DB_URI = 'mongodb://localhost:27017/myapp';

// function connect() {
//     return new Promise((resolve, reject) => {

//         if (process.env.NODE_ENV === 'test') {
//             console.log('Connecting mock')
//             const Mockgoose = require('mockgoose').Mockgoose;
//             const mockgoose = new Mockgoose(mongoose);

//             mockgoose.prepareStorage()
//                 .then(() => {
//                     mongoose.connect(DB_URI,
//                         { useNewUrlParser: true, useCreateIndex: true })
//                         .then((res, err) => {
//                             if (err) return reject(err);
//                             resolve();
//                         })
//                 })
//         } else {
//             mongoose.connect(DB_URI,
//                 { useNewUrlParser: true, useCreateIndex: true })
//                 .then((res, err) => {
//                     if (err) return reject(err);
//                     resolve();
//                 })
//         }
//     });
// }

// function close() {
//     return mongoose.disconnect();
// }

// module.exports = { connect, close };