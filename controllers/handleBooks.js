const fetch = require('node-fetch');
const SavedBooks = require('../db/models/BookSchema');
require('dotenv').config();

async function getSearchResults(req,res){
  console.log("[getSearchResults]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {
    const apiKey = process.env.API_KEY_GB;
    const searchTerm = req.params.searchterm;
    console.log(`Search for: ${searchTerm}`.blue);
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=newest&key=${apiKey}`;
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

async function getBookDetails(req,res){
  console.log("[getBookDetails]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {
    const apiKey = process.env.API_KEY_GB;
    const ISBN = req.params.book;
    console.log("looking for book:".green, ISBN );
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${ISBN}&orderBy=newest&key=${apiKey}`;
    const apiResult = await fetch(apiURL)
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err))
    console.log("RESULT".blue, apiResult.items.length);
    return res.status(200).json({
      success: true,
      message: "BOOK FOUND",
      count: apiResult.items.length,
      book: apiResult.items[0]
    })
  } catch (err) {
      return res.status(500).json({
        success: false,
        message: "SERVER ERROR -- getBookDetails", 
        error: err})
  }
};

async function nyTimesBookList(req,res){
  console.log("[nyTimesBookList]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {
    const apiKey = process.env.API_KEY_NY;
    const apiURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
      console.log("NYTIMES book data".green, apiResult.num_results)
    return res.status(200).json({
      success: true, 
      data: apiResult
    })
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: "SERVER ERROR -- nyTimesDisplay", 
      error: err
    })
  }; 
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
  console.log(req.body);
  try {
    const bookData = {
      bookID: req.body.bookID, 
      title: req.body.title, 
      authors: req.body.authors,
      textsnippet: req.body.textsnippet,
      description: req.body.description,
      link: req.body.link,
      image: req.body.image,
      isbn: req.body.isbn
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

module.exports = { getSearchResults, getBookDetails, nyTimesBookList, getSavedBooks, saveBook, deleteBook };

