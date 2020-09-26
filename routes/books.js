const express = require('express');
const router = express.Router();

const { getSearchResults } = require('../controllers/handleBooks');

router
  .route('/search/:searchterm')
  .get( getSearchResults )
  

  module.exports = router;