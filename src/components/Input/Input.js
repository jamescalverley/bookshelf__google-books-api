import React, {useState} from 'react';
import './Input.css';

function Input(props){

  const [inputText, setInputText] = useState("");

  function handleSearch(ev){
    ev.preventDefault();
    console.log(`[handleSearch] --- search: ${inputText}`);
    props.apiCall(inputText);
    props.setFeaturedDisplay(false);
  };

  function handleInputChange(ev){
    const searchText = ev.target.value;
    setInputText(searchText);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSearch}>
        <input onChange={handleInputChange} type="text"/>
        <button>Search</button>
      </form>
    </div>
    
  )
};

export default Input;