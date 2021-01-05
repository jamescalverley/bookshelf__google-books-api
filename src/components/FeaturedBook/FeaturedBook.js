import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import './FeaturedBook.css';

function FeaturedBook( {book} ){

  const isbn = book.isbns[0].isbn10 || book.primary_isbn10;
  const title = book.title.toLowerCase().replace(/\s/g, '+');

  return (
    <motion.div className="featured-book" whileHover={{ scale: 1.08 }}>
      <Link className="featured-link" to={`book/${isbn}?title=${title}`}>
        <div className="featured-image">
          <img className="featured-image" src={book.book_image} alt="book-cover"/>        
        </div>
     </Link>  
    </motion.div>
    
  )
};

export default FeaturedBook;