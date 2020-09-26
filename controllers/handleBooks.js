const fetch = require('node-fetch');
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
  console.log("BOOK DATA".red, apiResult.items[2].volumeInfo)
  
    return res.send({ 
      status: "Success", 
      searchTerm: searchTerm,
      count: apiResult.items.length,
      data: apiResult })
  } catch (err) {
    return res.send({ status: "Error", message: "API CALL ERROR"})
  }
};

exports.getSearchResults = getSearchResults;