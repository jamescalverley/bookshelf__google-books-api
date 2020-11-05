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

app.get('/api/test/:search', (req,res) => {
  console.log("INCOMING REQUEST");
  const search = req.params
  console.log(search)
  res.send({message: "test"})
});

const bookSearch = require('./routes/books');
const localstorageSet = require('./routes/localstorage');
app.use('/api/', bookSearch);
app.use('/api/user', localstorageSet)

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`.bold.cyan)
});