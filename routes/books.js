const express = require('express');
const router = express.Router();

const { nyTimesBookList, getSearchResults, getSavedBooks, saveBook, deleteBook } = require('../controllers/handleBooks');

router 
  .route('/')
  .get( nyTimesBookList )

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/savebook')
  .post( saveBook )

router 
  .route('/delete/:deleteID')
  .delete( deleteBook )

router
  .route('/savedbooks')
  .get( getSavedBooks )
  

  module.exports = router;