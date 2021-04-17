import React from 'react';
import { Link } from 'react-router-dom';
import './TopBook.css';
import {motion} from 'framer-motion';

function TopBook( {book} ){

  const isbn10 = book.volumeInfo.industryIdentifiers[0].identifier;
  const isbn13 = book.volumeInfo.industryIdentifiers[1].identifier;
  const title = book.volumeInfo.title.replace(/\s/g, '+').toLowerCase();

  return (
    
      <Link className="topbook topbook-link" to={`book/${title}?isbn10=${isbn10}&isbn13=${isbn13}`}>
        <motion.div className="topbook-image" whileHover={{ scale: 1.04 }}>
          <img className="topbook-image" src={book.volumeInfo.imageLinks.thumbnail} alt="book-cover"/>        
        </motion.div>
        <div className="topbook-info">
          <h5>{book.volumeInfo.title}</h5>
          <h6>{book.volumeInfo.authors[0]}</h6>
          <p>{book.searchInfo.textSnippet}</p>
        </div>
      </Link>  
    
  )
};

export default TopBook;