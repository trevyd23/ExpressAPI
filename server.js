const expresss = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const morgan = require('morgan');


const app = expresss();

//Body Parser Middleware
app.use(bodyParser.json());
//Logger Middleware
app.use(morgan('combined'));

//DB Config
const db = config.get('mongoURI')

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error connecting to Mongo', err))

//Connect to server
const port = process.env.PORT || 5000;

//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`Server started on: ${port}`))