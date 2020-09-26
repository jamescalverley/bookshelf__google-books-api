import React from 'react';

function Book( {book} ){

  console.log("BOOK", book)

  return (
    <div className="book-contatiner">
      <h2>{book.volumeInfo.title}</h2>
      <h3>{book.volumeInfo.authors[0] || "no author"}</h3>
      <p>{book.volumeInfo.description}</p>
      <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">Preview</a>
    </div>
  )
};

export default Book;