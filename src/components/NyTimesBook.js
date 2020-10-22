import React from 'react';

function NyTimesBook(props){

  return (
    <div className="nyt-book">
      <div className="nyt-image">
        <img className="nyt=image" src={props.image} alt="book-cover"/>        
      </div>
      <div className="book-metrics">
        <p>Rank: {props.rank}</p>
        <p>Weeks on List: {props.weeks}</p>
      </div>
      <div className="book-info">
        <h4>{props.title}</h4>
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
      
    </div>
  )
};

export default NyTimesBook;