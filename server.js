const express = require('express');
const app = express();
const dbConnection = require('./db/config/db');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();

//connects mongoDB
dbConnection();

app.use('/*', express.static('public'));

const bookSearch = require('./routes/books');
const localstorageSet = require('./routes/localstorage');
app.use('/api/', bookSearch);
app.use('/api/user', localstorageSet)

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`.bold.cyan)
});