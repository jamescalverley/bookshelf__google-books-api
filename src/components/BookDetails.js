import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
const axios = require('axios');

function BookDetails(props){
  const params = useParams();
  const isbn = params.book;
  const [book, setBook] = useState({});
  

  console.log("BOOK", book)

  
  async function getBookData(){
    try {
      console.log(`Getting book data for ${isbn}`)
      const result = await axios.get(`/api/book/${isbn}`);
      const bookData = result.data.book;
      console.log(result);
      setBook({
        title: bookData.volumeInfo.title,
        subtitle: bookData.volumeInfo.subtitle,
        author: bookData.volumeInfo.authors[0],
        description: bookData.volumeInfo.description
      });
    } catch (err) {
      console.log("ERROR", err)
    };
  };
  
  useEffect( () => {
    getBookData();
  },[])

  return (
    <>
      <NavBar />
      <div className="book-details-container">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
        <p>{book.author}</p>
        <p>{book.description}</p>     
      </div>
    </>
  )
};

export default BookDetails;