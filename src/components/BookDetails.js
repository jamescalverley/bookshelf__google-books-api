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

  function getUserID(){
    console.log("getting userID from local storage");
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };

  async function getBookData(){
    try {
      console.log(`Getting book data for ${ISBN}`)
      const result = await axios.get(`/api/book/${ISBN}`);
      const book = result.data.book;
      console.log("RESULT", book);
      setBook({
        bookID: book.id ? book.id : null,
        title: book.volumeInfo.title ? book.volumeInfo.title : "",
        subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "",
        authors: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "",
        textSnippet: book.searchInfo ? book.searchInfo.textSnippet : "",
        description: book.volumeInfo.description ? book.volumeInfo.description : "", 
        link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
        image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
        isbn: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : false
        });
    } catch (err) {
      console.log("ERROR", err)
    };
  };

  async function saveBook(){
    try {
      const userID = await getUserID();
      console.log(`Saving book with userID -- ${userID}`);
      const result = await axios.post(`/api/savebook/${userID}`, book);
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
      <div className="book-details-image">
        <img src={book.image} alt="book-cover"/>        
      </div>
      <div className="book-details-container">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
        <p>{book.authors}</p>
        <p>{book.description}</p> 
        <div className="book-links">
          { !saved ? 
            <SaveBtn handleSave={handleSave} />
            :
            <Saved />
          }
          <a href={book.link} target="_blank" rel="noopener noreferrer">Preview</a>
        </div>    
      </div>
    </div>
  )
};

export default BookDetails;