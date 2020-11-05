import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SavedBook(props){

  const [display, setDisplay] = useState(true);
  const bookData = { deleteID: props.dbID };

  async function deleteBook(){
    try {
      const result = await axios.delete(`/api/delete/${bookData.deleteID}`);
      console.log(result);
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  function handleDelete(){
    console.log("DELETE BOOK --", bookData);
    deleteBook();
    setDisplay(false);
  };

  return (
    <>
    { display && 
      <div className="book-container">
        <Link to={`book/${props.isbn}`}>
          <div className="book-image">
            <img src={props.image} alt="book-cover"/>
          </div>
          <div className="book-info">
            <h2>{props.title}</h2>
            <h3>{props.authors}</h3>
            <p>{props.textSnippet}</p>
          </div>
        </Link>
        <div className="book-links">
          <button onClick={handleDelete}>Remove</button>
          <a href={props.link} target="_blank" rel="noopener noreferrer">Preview</a>
        </div>
          
        
        
      </div>
    }
    </>
    

  )
};

export default SavedBook;

