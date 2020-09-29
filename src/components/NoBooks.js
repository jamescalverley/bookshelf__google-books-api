import React from 'react';
import { Link } from 'react-router-dom';

function NoBooks(){
  return (
    <div className="no-saved-books">
      <h4>No saved books</h4>
      <button>
          <Link to="/">Search</Link>
      </button>
    </div>
  )
}

export default NoBooks;