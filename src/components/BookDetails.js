import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const axios = require('axios');

function BookDetails(props){
  const params = useParams();
  const [bookData, setBookData] = useState();
  const isbn = params.book;

  
  async function getBookData(){
    try {
      console.log(`Getting book data for ${isbn}`)
      const result = await axios.get(`/api/book/${isbn}`);
      console.log(result);
      setBookData(bookData);
    } catch (err) {
      console.log("ERROR", err)
    };
  };
  
  
  
  
  useEffect( () => {
    getBookData();
  })

  return (
    <>
      <h1>Book Details for {params.book}</h1>
    </>
  )
};

export default BookDetails;