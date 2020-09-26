import React, {useState} from 'react';

function Input(props){

  const [inputText, setInputText] = useState("");

  function handleSearch(ev){
    ev.preventDefault();
    console.log(`[handleSearch] --- search: ${inputText}`);
    props.apiCall(inputText);
  };

  function handleInputChange(ev){
    const searchText = ev.target.value;
    console.log(searchText);
    setInputText(searchText);
  };

  return (
    <form onSubmit={handleSearch}>
      <input onChange={handleInputChange} type="text"/>
      <button>Search</button>
    </form>
  )
};

export default Input;