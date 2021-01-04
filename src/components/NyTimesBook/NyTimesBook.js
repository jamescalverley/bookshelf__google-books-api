import React from 'react';
import './NyTimesBook.css';
import { Link } from 'react-router-dom';

function NyTimesBook(props){

  const displayTitle = props.title.toLowerCase()
  .split(' ')
  .map( (word) =>  word.charAt(0).toUpperCase() + word.substring(1) )
  .join(' ')

  const isbn = props.isbn || props.isbnP;
  const title = props.title.toLowerCase().replace(/\s/g, '+');
  
  return (
    <Link className="nyt-book nyt-book-link" to={`book/${isbn}?title=${title}`}>
      <div className="nyt-image">
        <img className="nyt-image" src={props.image} alt="book-cover"/>        
      </div>
      {/* <div className="book-metrics">
        <p>Rank: {props.rank}</p>
        <p>Weeks on List: {props.weeks}</p>
      </div> */}
      <div className="nyt-book-info">
        <h5>{displayTitle}</h5>
        <p>{props.author}</p>
      </div>
    </Link>  
  )
};

export default NyTimesBook;