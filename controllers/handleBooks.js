const fetch = require('node-fetch');
const SavedBook = require('../db/models/BookSchema');
require('dotenv').config();

async function getSearchResults(req,res){
  console.log("[getSearchResults]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {
    const apiKey = process.env.API_KEY;
    const searchTerm = req.params.searchterm;
    console.log(`Search for: ${searchTerm}`.blue);
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=newest&key=${apiKey}`
    const apiResult = await fetch(apiURL)
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    console.log(`Success -- Result Count ${apiResult.items.length}`.green);
    const booksResult = apiResult.items;
    return res.status(200).json({ 
      success: true, 
      searchTerm: searchTerm,
      count: apiResult.items.length,
      books: booksResult })
  } catch (err) {
      return res.status(500).json({
        success: false,
        message: "SERVER ERROR -- getSearchResults", 
        error: err})
  }
};

async function saveBook(req,res){
  console.log("[saveBook]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  console.log(req.body);
  try {
    const bookData = {
      bookID: req.body.bookID, 
      title: req.body.title, 
      authors: req.body.authors,
      description: req.body.description,
      link: req.body.link
    };
    const savedBook = await SavedBook.create(bookData);
    console.log(`Success -- book saved: ${savedBook}`.cyan);
    return res.status(200).json({
      success: true,
      data: savedBook
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR -- saveBook", 
      error: err})
  };
};

async function getSavedBooks(req,res){
  console.log("[getSavedBooks]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {

    const savedBooks = await SavedBook.find();
    console.log("Saved Books: ".green, savedBooks.length)

    return res.status(200).json({
      success: true,
      savedBooks: savedBooks
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR -- getSavedBooks", 
      error: err})
  };
};


module.exports = { getSearchResults, saveBook, getSavedBooks };

