import React, { useState } from 'react';
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

  console.log(`Title: ${bookData.title}___ image: ${bookData.image}`);

  async function saveBook(){
    try {
      const userID = await getUserID();
      console.log(`Saving book with userID -- ${userID}`);
      const result = await axios.post(`/api/savebook/${userID}`, bookData);
      console.log("Post Success", result)
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    console.log("Saving book: ", bookData)
    saveBook();
    setSaved(true);
  };

  return (
    <div className="book-container">
      <Link to={`book/${bookData.isbn}`}>
        <div className="book-image">
          <img src={props.image} alt="book-cover"/>        
        </div>
        <div className="book-info">
          <h2>{props.title}</h2>
          <h3>{props.authors[0]}</h3>
          <p>{props.textSnippet}</p>
        </div>
      </Link>
        <div className="book-links">
          { !saved ? 
            <SaveBtn handleSave={handleSave} />
            :
            <Saved />
          }
          <a href={props.link} target="_blank" rel="noopener noreferrer">Preview</a>
        </div>
    </div>
  )
};

SearchedBook.defaultProps = {
  title: "",
  description: "",
  image: "",
  link: "",
  authors: "", 
  textsnippet: "", 
  isbn: ""
};

export default SearchedBook;