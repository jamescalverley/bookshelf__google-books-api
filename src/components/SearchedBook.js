import React from 'react';
const axios = require('axios');

function SearchedBook( props ){

  const bookData = {
    bookID: props.bookID,
    title: props.title,
    authors: props.authors[0],
    description: props.description, 
    link: props.infoLink,
    image: props.image
  };

  console.log(bookData)

  async function saveBook(){
    try {
      const result = await axios.post('/api', bookData);
      console.log("Post Success", result)
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    console.log("Saving book: ", bookData)
    saveBook();
  };

  return (
    <div className="book-contatiner">
      <div className="book-image">
        <img src={props.image} alt="book-cover"/>        
      </div>
      <div className="book-info">
        <h2>{props.title}</h2>
        <h3>{props.authors[0]}</h3>
        <p>{props.description}</p>
        <button onClick={handleSave}>Save</button>
        <a href={props.infoLink} target="_blank" rel="noopener noreferrer">Preview</a>
      </div>
    </div>
  )
};

export default SearchedBook;