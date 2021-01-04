import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedBook.css';

function FeaturedBook( {book} ){

  const isbn = book.isbns[0].isbn10 || book.primary_isbn10;
  const title = book.title.toLowerCase().replace(/\s/g, '+');

  return (
    <Link className="featured-book featured-link" to={`book/${isbn}?title=${title}`}>
      <div className="featured-image">
        <img className="featured-image" src={book.book_image} alt="book-cover"/>        
      </div>
    </Link>  
  )
};

export default FeaturedBook;