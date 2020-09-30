import React from 'react';
import { Link } from 'react-router-dom';

function NoBooks(){
  return (
    <div className="no-saved-books">
      <h2>No saved books</h2>
      <h4>Search for your favourite book.</h4>  
      <button>
          <Link to="/">Search</Link>
      </button>
    </div>
  )
}

export default NoBooks;