const fetch = require('node-fetch');
const SavedBooks = require('../db/models/BookSchema');
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

async function getSavedBooks(req,res){
  console.log("[getSavedBooks]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {

    const savedBooks = await SavedBooks.find();
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

async function saveBook(req,res){
  console.log("[saveBook]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  console.log(`Save Book: ${req.body.title} - ${req.body.bookID}`);
  try {
    const bookData = {
      bookID: req.body.bookID, 
      title: req.body.title, 
      authors: req.body.authors,
      description: req.body.description,
      link: req.body.link
    };
    const savedBook = await SavedBooks.create(bookData);
    console.log(`Success -- book saved: ${savedBook._id} - ${savedBook.bookID}`.cyan);
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

async function deleteBook(req,res){
  console.log("[deleteBook]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  console.log(req.params)
  try {
  const deleteID = req.params.deleteID;
  console.log("DELETE".red, deleteID)

  const deleteBook = await SavedBooks.deleteOne({ bookID: deleteID });
  console.log("SUCCESS".green, deleteBook.deletedCount )

  return res.status(200).json({
    success: true,
    message: `Book: ${deleteID} deleted`
  });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR -- saveBook", 
      error: err})

  };

 
};

module.exports = { getSearchResults, getSavedBooks, saveBook, deleteBook };

