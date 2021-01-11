const fetch = require('node-fetch');
require('dotenv').config();

//! needed:
//* function to set when the API is called
//? function that returns the book data when called ( getNYTBookData )
//? try for featured books then duplicate for other categories

const apiKeys = {
  nyt: process.env.API_KEY_NY, 
  google: process.env.API_KEY_GB
};

let nytBooks = {
  featured: [], 
  topBooks: [], 
  nytFiction: [],
  nytNonFiction: []
};

const apiURLs = {
  featured: `https://api.nytimes.com/svc/books/v3/lists/current/mass-market-paperback.json?api-key=${apiKeys.nyt}`, 
  fiction: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKeys.nyt}`,
  nonfiction: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${apiKeys.nyt}`
};

async function nytFeaturedAPICall(){
  console.log("calling FEATURED API");
  try {
    const apiResult = await fetch( apiURLs.featured )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    console.log(`FEATURED -- ${apiResult.status} -- results: ${apiResult.num_results}  -- modified: ${apiResult.last_modified}`);
    nytBooks.featured = apiResult.results.books;
  } catch (err) {
      console.log("ERROR".red, err)
  };
};

async function nytTopBooksAPICall(){
  console.log("calling TOPBOOKS API");
  const GB_API = process.env.API_KEY_GB
  const bookISBNs = ['1443455733', '1250114292', '1501175300'];
  let i;
  for ( i = 0; i < bookISBNs.length; i++) {
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${bookISBNs[i]}&orderBy=newest&key=${GB_API}`;
    try {
      const apiResult = await fetch( apiURL )
        .then(res => res.json())
        .catch(err => console.log("ERROR".red, err));
      console.log(`TOPBOOK ${i} -- ${apiResult.items[0].volumeInfo.title}`);
      nytBooks.topBooks.push( apiResult.items[0] )
    } catch (err) {
        console.log("ERROR".red, err)
    };
  };
};

async function nytFictionAPICall(){
  console.log("calling FICTION API");
  try {
    const apiResult = await fetch( apiURLs.fiction )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    console.log(`FICTION -- ${apiResult.status} -- results: ${apiResult.num_results}  -- modified: ${apiResult.last_modified}`);
    nytBooks.fiction = apiResult.results.books;
  } catch (err) {
      console.log("ERROR".red, err)
  };
};

async function nytNonFictionAPICall(){
  console.log("calling NONFICTION API");
  try {
    const apiResult = await fetch( apiURLs.nonfiction )
      .then(res => res.json())
      .catch(err => console.log("ERROR".red, err));
    console.log(`NON-FICTION -- ${apiResult.status} -- results: ${apiResult.num_results}  -- modified: ${apiResult.last_modified}`);
    nytBooks.nonfiction = apiResult.results.books; 
  } catch (err) {
      console.log("ERROR".red, err);
  };
};

// calls NYT API initially (following DB connection)
setTimeout( () => {
  console.log("---- intial API Call ----");
  nytFeaturedAPICall();
  nytFictionAPICall();
  nytNonFictionAPICall();
  nytTopBooksAPICall();
}, 2000 );

// calls NYT Books API every 24 hours
setInterval( () => {
  nytFeaturedAPICall();
  nytFictionAPICall();
  nytNonFictionAPICall();
  nytTopBooksAPICall();
}, 60000*60*24 );






async function getNYTBookData(req,res){
  console.log("NYT API DATA", req.url);
  try {
    return res.status(200).json({
      success: true, 
      books: nytBooks
    })
  } catch (err) {
      return res.status(500).json({
        success: false
      })
  }
}; 

module.exports = { getNYTBookData }

