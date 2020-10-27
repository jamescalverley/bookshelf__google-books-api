import React from 'react';

function NyTimesBook(props){

  return (
    <div className="nyt-book">
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
      
    </div>
  )
};

export default NyTimesBook;