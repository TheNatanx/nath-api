require("dotenv").config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = require('./routes/router');

const app = express();
const port = 3000;
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Successfully connected to MongoDB"));
const db = mongoose.connection;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', router);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
