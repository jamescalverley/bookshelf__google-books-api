const express = require('express');
const router = express.Router();

const { getSearchResults, saveBook, getSavedBooks } = require('../controllers/handleBooks');

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/')
  .post( saveBook )

router
  .route('/savedbooks')
  .get( getSavedBooks )
  

  module.exports = router;