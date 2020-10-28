import React from 'react';
import { Link } from 'react-router-dom';

function NyTimesBook(props){

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
          <p>{props.title}</p>
          <p>{props.author}</p>
          {/* <p>{props.description}</p> */}
        </div>
      </Link>  
      
    </div>
  )
};

export default NyTimesBook;