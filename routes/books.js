const express = require('express');
const router = express.Router();

const { getSearchResults } = require('../controllers/handleBooks');

router
  .route('/searchresults/:search')
  .get( getSearchResults )
  

  module.exports = router;