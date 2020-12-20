import React, { useState } from 'react';
import './SearchedBook.css';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SearchedBook( props ){
  
  const [saved, setSaved] = useState(false);
  
  function getUserID(){
    console.log("getting userID from local storage");
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };
  
  const bookData = {
    bookID: props.bookID,
    title: props.title,
    subtitle: props.subtitle,
    authors: props.authors[0],
    textSnippet: props.textSnippet,
    description: props.description, 
    link: props.link,
    image: props.image,
    isbn: props.isbn
  };

  async function saveBook(){
    try {
      const userID = await getUserID();
      const result = await axios.post(`/api/savebook/${userID}`, bookData);
      console.log("Post Success", result);
    } catch (err) {
        console.log("POST ERROR", err);
    };
  };

  function handleSave(){
    console.log("handling save");
    saveBook();
    console.log("setting SAVED");
    setSaved(true);
    console.log("---save set", saved)
    //props.setNumber(prev => prev + 1);
    //props.setNumber();
  };

  return (
    <div className="searched-book-container">
      <div className="searched-book-image">
        <img src={props.image} alt="book-cover"/>        
      </div>
      <div className="searched-book-info">
        <div className="save-button-container">
          { !saved ? 
              <SaveBtn handleSave={handleSave} />
              :
              <Saved />
          }
        </div>
        <h2>{props.title}</h2>
        <h3>{props.authors[0]}</h3>
        <p>{props.textSnippet}</p>
        <div className="searched-book-links">
          <Link to={`/book/${bookData.isbn}`} className="searched-book-link">
            <button>Book Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
};



//const memoSearchedBook = React.memo( SearchedBook );
//export default memoSearchedBook
export default SearchedBook;