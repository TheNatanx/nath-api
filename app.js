require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();
const port = 3000;
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Successfully connected to MongoDB"));
const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
