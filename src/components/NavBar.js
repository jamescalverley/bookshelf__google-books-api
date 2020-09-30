import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

function NavBar(){

    

return (
    
    <div className="navbar">
        <nav>
            <ul>
                <li>
                    <NavLink 
                        to="/search" 
                        className="link"
                        activeClassName="active"  
                    >
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/savedbooks"
                        className="link"
                        activeClassName="active"     
                    >
                        Saved Books
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
    
    
)
};

export default NavBar;