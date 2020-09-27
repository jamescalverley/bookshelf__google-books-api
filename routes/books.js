const express = require('express');
const router = express.Router();

const { getSearchResults, saveBook } = require('../controllers/handleBooks');

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/')
  .post( saveBook )
  

  module.exports = router;