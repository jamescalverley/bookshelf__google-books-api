import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function NavBar(){

return (
    
    <div className="navbar">
        <nav>
            <ul>
                <li>
                    <Link 
                        to="/" >
                        Search
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/savedBooks" >
                        Saved Books
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    
    
)
};

export default NavBar;