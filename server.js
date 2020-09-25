const express = require('express');
const app = express();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();

const PORT = process.env.PORT || 8080;

const bookSearch = require('./routes/books');
app.use('/api/', bookSearch);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`.bold.cyan)
});