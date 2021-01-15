import React, { useEffect, useState } from 'react';
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

  async function checkDB( title, isbns ){
    try {
        // const isbn10 = isbns[0].identifier;
        // const isbn13 = isbns[1].identifier;
        const userID = await getUserID();
        //console.log(`isbns present ${isbn10} & ${isbn13}`);
        // const result = await axios.get(`/api/checkdb/${title}?isbn10=${isbn10}&isbn13=${isbn13}&userID=${userID}`);
        const result = await axios.get(`/api/checkdb/${title}?userID=${userID}`);
        console.log("CHECK-DB", result);
        if( result.data.bookSaved ){
          setSaved(true)
        } 
    } catch (err) {
        console.log("ERROR", err)
    }
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

  const testISBN = 12345;

  useEffect( () => {
    checkDB( props.title, testISBN );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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