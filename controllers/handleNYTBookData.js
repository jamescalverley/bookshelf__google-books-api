const fetch = require('node-fetch');
require('dotenv').config();

const apiKeys = {
  nyt: process.env.API_KEY_NY, 
  google: process.env.API_KEY_GB
};

let nytBooks = {
  featured: [], 
  fiction: [],
  nonfiction: [],
  topBooks: [
    {
      title: "The Glass Hotel",
      author: "Emily St. John Mandel",  
      isbn10: "1443455733",
      isbn13: "9781443455732", 
      textSnippet: "Weaving together the lives of these characters, The Glass Hotel moves between the ship, the skyscrapers of Manhattan and the wilderness of remote British Columbia, painting a breathtaking picture of greed and guilt, fantasy and delusion, ...", 
      thumbnail: "http://books.google.com/books/content?id=EpaUxQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    }, 
    {
      title: "Humans", 
      author: "Brandon Stanton", 
      isbn10: "1250114292", 
      isbn13: "9781250114297", 
      textSnippet: "Humans is the definitive catalogue of these travels. The faces and locations will vary from page to page, but the stories will feel deeply familiar.", 
      thumbnail: "http://books.google.com/books/content?id=_CtVzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
      title: "Home Body", 
      author: "Rupi Kaur", 
      isbn10: "1501175300", 
      isbn13: "9781501175305", 
      textSnippet: "From the #1 New York Times bestselling author of milk and honey and the sun and her flowers comes her greatly anticipated third collection of poetry. rupi kaur constantly embraces growth, and in home body, she walks readers through a ...", 
      thumbnail: "http://books.google.com/books/content?id=xwvBzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    }
  ], 
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
  //nytTopBooksAPICall();
  console.log("NYT API calls".blue);
}, 2000 );

// calls NYT Books API every 24 hours
setInterval( () => {
  nytFeaturedAPICall();
  nytFictionAPICall();
  nytNonFictionAPICall();
  //nytTopBooksAPICall();
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
