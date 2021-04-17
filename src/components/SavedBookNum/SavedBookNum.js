import React, {useState} from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './SavedBookNum.css';
const axios = require('axios');

function SavedBookNum(props){

  const [bookCount, setBookCount] = useState();

  function getUserID(props){
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };

  async function getBookNumber(){
    const userID = await getUserID();
    const result = await axios.get(`/api/bookcount/${userID}`);
    const count = result.data.bookCount;
    setBookCount(count);
  };

  useEffect( () => {
    getBookNumber();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.number])

  return (
    // <a href="./savedpage" className="link">
    //   Saved {bookCount}
    // </a>
    <a href='./search'>
      <NavLink 
        to="/savedbooks" 
        className="link"
        activeClassName="active"  
      >
        Saved <span className="bookcount">{bookCount}</span>
      </NavLink>
    </a>
  );
};

export default SavedBookNum;