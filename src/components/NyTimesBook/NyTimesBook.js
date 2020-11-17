import React from 'react';
import './NyTimesBook.css';
import { Link } from 'react-router-dom';

function NyTimesBook(props){

  const displayTitle = props.title.toLowerCase()
  .split(' ')
  .map( (word) =>  word.charAt(0).toUpperCase() + word.substring(1) )
  .join(' ')
  
  return (
    <div className="nyt-book">
      <Link className="nyt-book-link" to={`book/${props.isbn}`}>
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
      
    </div>
  )
};

export default NyTimesBook;