import React, { useState } from 'react';
import './SearchedBook.css';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SearchedBook( props ){

  const [saved, setSaved] = useState(false);

  const isbn10 = props.isbn[0].identifier;
  const isbn13 = props.isbn[1].identifier;
  const title = props.title.toLowerCase();
  
  function getUserID(){
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
      await axios.post(`/api/savebook/${userID}`, bookData);
    } catch (err) {
        console.log("POST ERROR", err);
    };
  };

  function handleSave(){
    saveBook();
    setSaved(true);
  };

  return (
    <div className="searched-book-container">
      <div className="searched-book-image">
        <img src={props.image} alt="book-cover"/>        
      </div>
      <div className="searched-book-info">
        <h2>{props.title}</h2>
        <h3>{props.authors[0]}</h3>
        <p>{props.textSnippet}</p>
        <div className="searched-book-link">
          <Link to={`/book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
            <button className="book-details-btn">Book Details</button>
          </Link>
          { !saved ? <SaveBtn handleSave={handleSave} /> : <Saved /> }
        </div>
      </div>
    </div>
  )
};



//const memoSearchedBook = React.memo( SearchedBook );
//export default memoSearchedBook
export default SearchedBook;