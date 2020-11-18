import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './HomeInput.css';

function HomeInput(props){

  const [inputText, setInputText] = useState("");

  function handleSearch(ev){
    ev.preventDefault();
    console.log(`[handleSearch] --- search: ${inputText}`);
  };

  function handleInputChange(ev){
    const searchText = ev.target.value;
    setInputText(searchText);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <input onChange={handleInputChange} type="text"/>
        <Link to={`/search/${inputText}`}>
          <button>Search</button>
        </Link>
      </form>
    </div>
  )
};

export default HomeInput;