import React from 'react';
import '../../App.css';
import './NavBar.css';
import SavedBookNum from '../SavedBookNum/SavedBookNum';
import { NavLink, Link } from 'react-router-dom';

function NavBar(props){

  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="logo-container">--LOGO--</div>
      </Link>
      <nav>
        <a href='./search'>
          <NavLink 
            to="/search" 
            className="link"
            activeClassName="active"  
          >
            Search
          </NavLink>
        </a>
        <a href='./search'>
          <NavLink 
            to="/savedbooks" 
            className="link"
            activeClassName="active"  
          >
            <SavedBookNum number={props.number}/>
          </NavLink>
        </a>
      </nav>
    </div>
    )
};

export default NavBar;