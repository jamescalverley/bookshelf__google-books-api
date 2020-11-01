import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SaveBtn from './SaveBtn';
import Saved from './Saved';
const axios = require('axios');

function BookDetails(props){
  const params = useParams();
  const ISBN = params.book;
  const [book, setBook] = useState({});
  const [saved, setSaved] = useState(false);

  console.log("BOOK ----> ", book)


  async function getBookData(){
    try {
      console.log(`Getting book data for ${ISBN}`)
      const result = await axios.get(`/api/book/${ISBN}`);
      const bookData = result.data.book;
      console.log("RESULT".blue, bookData);
      setBook({
        bookID: bookData.id,
        title: bookData.volumeInfo.title,
        subtitle: bookData.volumeInfo.subtitle,
        authors: bookData.volumeInfo.authors[0],
        textsnippet: bookData.searchInfo.textsnippet,
        description: bookData.volumeInfo.description, 
        link: bookData.volumeInfo.infoLink,
        image: bookData.volumeInfo.imageLinks.thumbnail
      });
    } catch (err) {
      console.log("ERROR", err)
    };
  };

  async function saveBook(){
    try {
      const result = await axios.post('/api/savebook', book);
      console.log("Post Success", result)
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    console.log("Saving book: ", book)
    saveBook();
    setSaved(true);
  };

  let history = useHistory();
  function handleBack(){
    history.goBack();
  };
  
  useEffect( () => {
    getBookData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="book-details-page">
      <button onClick={handleBack}>Back</button>
      <div className="book-details-container">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
        <p>{book.author}</p>
        <p>{book.description}</p> 
        <div className="book-links">
          { !saved ? 
            <SaveBtn handleSave={handleSave} />
            :
            <Saved />
          }
          <a href={props.link} target="_blank" rel="noopener noreferrer">Preview</a>
        </div>    
      </div>
    </div>
  )
};

export default BookDetails;