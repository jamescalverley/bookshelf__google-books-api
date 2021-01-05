import React from 'react';
import './NoBooks.css';
import { Link } from 'react-router-dom';

function NoBooks(){
  return (
    <div className="no-saved-books">
      <h3>No saved books</h3>
      <h4>Search for your favourite book.</h4>  
      <Link className="no-saved-books-link" to="/search">
        <button>Search</button>   
      </Link>
    </div>
  )
}

export default NoBooks;