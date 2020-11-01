import React from 'react';
import { Link } from 'react-router-dom';

function NyTimesBook(props){

  const displayTitle = props.title.toLowerCase()
  .split(' ')
  .map( (word) =>  word.charAt(0).toUpperCase() + word.substring(1) )
  .join(' ')
  
  console.log("ISBN", props.isbn)

  return (
    <div className="nyt-book">
      <Link to={`book/${props.isbn}`}>
        <div className="nyt-image">
          <img className="nyt=image" src={props.image} alt="book-cover"/>        
        </div>
        {/* <div className="book-metrics">
          <p>Rank: {props.rank}</p>
          <p>Weeks on List: {props.weeks}</p>
        </div> */}
        <div className="nyt-book-info">
          <p>{displayTitle}</p>
          <p>{props.author}</p>
          {/* <p>{props.description}</p> */}
        </div>
      </Link>  
      
    </div>
  )
};

export default NyTimesBook;