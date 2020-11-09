import React from 'react';
import '../../App.css';
import './NavBar.css'
import { NavLink } from 'react-router-dom';

function NavBar(props){

return (
    <>
        
        <div className="navbar">
            <div className="logo-container">--LOGO--</div>
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
                        SavedBooks
                    </NavLink>
                </a>
            </nav>
        </div>
    </>
    )
};

export default NavBar;