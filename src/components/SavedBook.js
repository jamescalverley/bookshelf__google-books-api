import React from 'react';

function SavedBook(props){

  const bookData = {
    deleteID: props.bookID
  }
  function handleDelete(){
    console.log("DELETE BOOK --", bookData)
  };

  return (
    <div className="book-contatiner">
      <h2>{props.title}</h2>
      <h3>{props.authors[0]}</h3>
      <p>{props.description}</p>
      <button onClick={handleDelete}>Remove</button>
      <a href={props.infoLink} target="_blank" rel="noopener noreferrer">Preview</a>
    </div>
  )
};

export default SavedBook;

//! WHY is proxy request done working all the time
//! WHY is deleteID undefined