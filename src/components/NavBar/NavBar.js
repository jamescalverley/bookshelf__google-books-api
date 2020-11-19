import React from 'react';
import '../../App.css';
import './NavBar.css';
//import SavedBookNum from '../SavedBookNum/SavedBookNum';
import { NavLink, Link } from 'react-router-dom';

function NavBar(props){

  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="logo-container">
          <span className="wordmark">bookshelf</span>
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-bookmark-heart" fill="#ED696A" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
          </svg>
        </div>
      </Link>
      <nav>
        <p href='./search'>
          <NavLink 
            to="/search" 
            className="link"
            activeClassName="active"  
          >
            Search
          </NavLink>
        </p>
        <p href='./search'>
          <NavLink 
            to="/savedbooks" 
            className="link"
            activeClassName="active"  
          >
            Saved Books
            {/* <SavedBookNum number={props.number}/> */}
          </NavLink>
        </p>
      </nav>
    </div>
    )
};

export default NavBar;