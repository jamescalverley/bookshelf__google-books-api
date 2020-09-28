import React from 'react';
const axios = require('axios');

function SavedBook(props){

  const bookData = {
    deleteID: props.bookID
  }

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
  };

  return (
    <div className="book-contatiner">
      <h2>{props.title}</h2>
      <h3>{props.authors}</h3>
      <p>{props.description}</p>
      <button onClick={handleDelete}>Remove</button>
      <a href={props.link} target="_blank" rel="noopener noreferrer">Preview</a>
    </div>
  )
};

export default SavedBook;

