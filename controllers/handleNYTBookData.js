const fetch = require('node-fetch');
require('dotenv').config();

const apiKeys = {
  nyt: process.env.API_KEY_NY, 
  google: process.env.API_KEY_GB
};

let nytBooks = {
  featured: [], 
  topBooks: [], 
  fiction: [],
  nonfiction: []
};

const apiURLs = {
  featured: `https://api.nytimes.com/svc/books/v3/lists/current/mass-market-paperback.json?api-key=${apiKeys.nyt}`, 
  fiction: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKeys.nyt}`,
  nonfiction: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${apiKeys.nyt}`
};

async function nytFeaturedAPICall(){
  try {
    const apiResult = await fetch( apiURLs.featured )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    nytBooks.featured = apiResult.results.books.slice(0,9);
  } catch (err) {
      console.log("ERROR".red, err)
  };
};

async function nytTopBooksAPICall(){
  const GB_API = process.env.API_KEY_GB
  const bookISBNs = ['1443455733', '1250114292', '1501175300'];
  let i;
  for ( i = 0; i < bookISBNs.length; i++) {
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${bookISBNs[i]}&orderBy=newest&key=${GB_API}`;
    try {
      const apiResult = await fetch( apiURL )
        .then(res => res.json())
        .catch(err => console.log("ERROR".red, err));
      nytBooks.topBooks.push( apiResult.items[0] )
    } catch (err) {
        console.log("ERROR".red, err)
    };
  };
};

async function nytFictionAPICall(){
  try {
    const apiResult = await fetch( apiURLs.fiction )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    nytBooks.fiction = apiResult.results.books.slice(0,10);
  } catch (err) {
      console.log("ERROR".red, err)
  };
};

async function nytNonFictionAPICall(){
  try {
    const apiResult = await fetch( apiURLs.nonfiction )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    nytBooks.nonfiction = apiResult.results.books.slice(0,10); 
  } catch (err) {
      console.log("ERROR".red, err);
  };
};

// calls NYT API initially (following DB connection)
setTimeout( () => {
  nytFeaturedAPICall();
  nytFictionAPICall();
  nytNonFictionAPICall();
  nytTopBooksAPICall();
  console.log("NYT API calls".blue);
}, 2000 );

// calls NYT Books API every 24 hours
setInterval( () => {
  nytFeaturedAPICall();
  nytFictionAPICall();
  nytNonFictionAPICall();
  nytTopBooksAPICall();
}, 60000*60*24 );

async function getNYTBookData(req,res){
  try {
    return res.status(200).json({
      success: true, 
      books: nytBooks
    })
  } catch (err) {
      return res.status(500).json({
        success: false
      })
  };
}; 

module.exports = { getNYTBookData };
