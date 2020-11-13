const express = require('express');
const router = express.Router();

const { nyTimesBookList, getSearchResults, getBookDetails, saveBook, deleteBook, getSavedBooks, bookCount } = require('../controllers/handleBooks');

router 
  .route('/')
  .get( nyTimesBookList )

router
  .route('/search/:searchterm')
  .get( getSearchResults )

router 
  .route('/book/:book')
  .get( getBookDetails )

router 
  .route('/savebook/:userID')
  .post( saveBook )

router 
  .route('/delete/:deleteID')
  .delete( deleteBook )

router
  .route('/savedbooks/:userID')
  .get( getSavedBooks )

router 
  .route('/bookcount/:userID')
  .get( bookCount )
  

  module.exports = router;