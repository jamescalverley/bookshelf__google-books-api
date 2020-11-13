import React, { useState } from 'react';
import './SavedBook.css';
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
    props.setNumber(prev => prev - 1);
    props.setBooksDisplay(prev => prev - 1)
  };

  return (
    <>
      { display && 
        <div className="saved-book-container">
          <div className="saved-book-header">
            <div className="saved-book-image">
              <img src={props.image} alt="book-cover"/>
            </div>
            <div className="saved-book-info">
              <h2>{props.title}</h2>
              <h3>{props.authors}</h3>
              <Link to={`book/${props.isbn}`} className="saved-book-link">
                <button>Book Details</button>
              </Link>
              <div className="remove-button">
                <button onClick={handleDelete}>Remove</button> 
              </div>
              {/* <p>{props.textSnippet}</p> */}
            </div>
          </div>
          
            
        </div>
      }
    </>
  )
};

export default SavedBook;

