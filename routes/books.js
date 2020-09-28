const express = require('express');
const router = express.Router();

const { getSearchResults, getSavedBooks, saveBook, deleteBook } = require('../controllers/handleBooks');

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/')
  .post( saveBook )

router 
  .route('/delete/:deleteID')
  .delete( deleteBook )

router
  .route('/savedbooks')
  .get( getSavedBooks )
  

  module.exports = router;