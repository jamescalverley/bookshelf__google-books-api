import React, { useCallback, useEffect, useState } from 'react';
import './SearchedBook.css';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SearchedBook( props ){
  console.log("rendering book", props.title);
  
  const [saved, setSaved] = useState(false);
  const [bookData, setBookData] = useState({});


  console.log("SAVED", saved)

  function getUserID(){
    console.log("getting userID from local storage");
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };
  
  const passedData = {
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

  function bookInit(){
    setBookData( ...passedData );
  };

  async function saveBook(){
    try {
      const userID = await getUserID();
      const result = await axios.post(`/api/savebook/${userID}`, passedData);
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

  useEffect( () => {
    //bookInit();
  }, []);

  return (
    <div className="searched-book-container">
      <div className="searched-book-info-container">
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
    </div>
  )
};



//const memoSearchedBook = React.memo( SearchedBook );
//export default memoSearchedBook
export default SearchedBook;