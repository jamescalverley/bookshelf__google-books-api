import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedBook.css';

function FeaturedBook( {book} ){

  const isbn = book.isbns[0].isbn10 || book.primary_isbn10;

  return (
    <div className="featured-book">
      <Link className="featured-link" to={`book/${isbn}`}>
        <div className="featured-image">
          <img className="featured-image" src={book.book_image} alt="book-cover"/>        
        </div>
      </Link>  
    </div>
  )
};

export default FeaturedBook;