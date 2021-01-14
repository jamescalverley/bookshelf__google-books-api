const fetch = require('node-fetch');
const SavedBooks = require('../db/models/BookSchema');
require('dotenv').config();

async function getSearchResults(req,res){
  try {
    const apiKey = process.env.API_KEY_GB;
    const searchTerm = req.params.searchterm;
    console.log(`Search for: ${searchTerm}`.blue);
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=relevance&key=${apiKey}`;
    const apiResult = await fetch(apiURL)
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    console.log(`Success -- Result Count ${apiResult.items.length}`.green);
    const booksResult = apiResult.items;
    booksResult.forEach( book => console.log(book.volumeInfo.title))
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

async function checkResults( isbn, title, bookArr ){
  let returnBook = { searchResult: false };
  await bookArr.forEach( book => {
    if ( book.volumeInfo.title.toLowerCase() === title ){
      returnBook = { searchResult: true, book };
      console.log("Book Found".green, book.volumeInfo.title)
    }
  })
  if ( returnBook === undefined ){
    return returnBook
  } 
  return returnBook
};

async function getBookDetails(req,res){
  try {
    const apiKey = process.env.API_KEY_GB;
    const paramTitle = req.params.title;
    const isbn10 = req.query.isbn10;
    const isbn13 = req.query.isbn13;
    const title = paramTitle.replace(/[^a-z]/g, " ");
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${isbn10}&key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err))
    const detailsResult = await checkResults(isbn10, title, apiResult.items);
    // checks if book was found with isbn10, if not calls API again with isbn13
    if ( detailsResult.searchResult === true ){
      return res.status(200).json({
        success: true,
        message: "BOOK FOUND",
        book: detailsResult
      })
    } else {
      const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${isbn13}&key=${apiKey}`;
      const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err))
      const detailsResult = await checkResults(isbn13, title, apiResult.items);
      return res.status(200).json({
        success: true,
        message: "BOOK FOUND",
        book: detailsResult
      })
    }
  } catch (err) {
      return res.status(500).json({
        success: false,
        message: "SERVER ERROR -- getBookDetails", 
        error: err})
  }
};

async function featuredBooks(req,res){
  try {
    const apiKey = process.env.API_KEY_NY;
    const apiURL = `https://api.nytimes.com/svc/books/v3/lists/current/mass-market-paperback.json?api-key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
      console.log("FEATURED BOOKS".green, apiResult.num_results);
      console.log("FEATURED", apiResult.last_modified)
    return res.status(200).json({
      success: true, 
      data: apiResult
    })
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: "SERVER ERROR -- featuredBooks", 
      error: err
    })
  };
};

async function topBooksAPICall( isbn ){
  try {
    const apiKey = process.env.API_KEY_GB;
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${isbn}&orderBy=newest&key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    return apiResult
  } catch (err) {
    console.log("ERROR", err)
  }
};

async function topBooks(req,res){
  try {
    // hardcoded top books
    const bookISBNs = ['1443455733', '1250114292', '1501175300'];
    const top3Books = [];
    let i;
    for ( i = 0 ; i < bookISBNs.length; i++) {
      const book = await topBooksAPICall( bookISBNs[i]);
      top3Books.push( book );
    }
    console.log("TOP BOOKS".green, top3Books.length);
    return res.status(200).json({
      success: true, 
      data: top3Books
    })
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: "SERVER ERROR -- featuredBooks", 
      error: err
    })
  };
};

async function nytNonFiction(req,res){
  try {
    const apiKey = process.env.API_KEY_NY;
    const apiURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
      console.log("NYT NONFICTION".green, apiResult.num_results);
      console.log("Non-Fiction", apiResult.last_modified);
    return res.status(200).json({
      success: true, 
      data: apiResult
    })
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: "SERVER ERROR -- nytNonFiction", 
      error: err
    })
  }; 
};

async function nytFiction(req, res){
  try {
    const apiKey = process.env.API_KEY_NY;
    const apiURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
    const apiResult = await fetch( apiURL )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
      console.log("NYT FICTION".green, apiResult.num_results);
      console.log("Fiction", apiResult.last_modified);
    return res.status(200).json({
      success: true, 
      data: apiResult
    })
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: "SERVER ERROR -- nytFiction", 
      error: err
    })

  }
};

async function getSavedBooks(req,res){
  console.log(`USER ID >>> ${req.params.userID}`)
  try {
    const userID = req.params.userID;
    const savedBooks = await SavedBooks.find( { "savedBy": userID });
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
  console.log("USER ID: ", req.params )
  try {
    const bookData = {
      savedBy: req.params.userID,
      bookID: req.body.bookID, 
      title: req.body.title, 
      authors: req.body.authors,
      textSnippet: req.body.textSnippet,
      description: req.body.description,
      link: req.body.link,
      image: req.body.image,
      isbn: req.body.isbn
    };
    console.log(bookData)
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
  console.log(req.params)
  try {
    const deleteID = req.params.deleteID;
    console.log("DELETE".red, deleteID)
    const deleteBook = await SavedBooks.deleteOne({ _id: deleteID });
    console.log("SUCCESS".green, deleteBook.deletedCount );
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

async function bookCount(req,res){
  console.log(req.params);
  try {
    const userID = req.params.userID;
    const dbCount = await SavedBooks.find({ "savedBy" : userID }).countDocuments();
    console.log("Result found");
    return res.status(200).json({
      success: true,
      bookCount: dbCount
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR -- bookCount", 
      error: err})
  }
};

module.exports = { 
  getSearchResults, 
  getBookDetails, 
  featuredBooks,
  topBooks,
  nytNonFiction, 
  nytFiction, 
  getSavedBooks, 
  saveBook, 
  deleteBook, 
  bookCount 
};




