import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './HomeInput.css';

function HomeInput(props){

  const [inputText, setInputText] = useState("");

  function handleSearch(ev){
    ev.preventDefault();
  };

  function handleInputChange(ev){
    const searchText = ev.target.value.replace(/\s/g, '+');
    setInputText(searchText);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <input onChange={handleInputChange} type="text"/>
        <Link className="main-btn" to={`/search/${inputText}`}>
          <button>Search</button>
        </Link>
      </form>
      <div className="mobile-btn">
        <Link to={`/search/${inputText}`}>
          <button>Search</button>
        </Link>
      </div>
      
    </div>
  )
};

export default HomeInput;