import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './components/errors/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';
import SavedPage from './components/SavedPage/SavedPage';
import BookDetails from './components/BookDetails/BookDetails';
const axios = require('axios');

function App() {
  
  const [number, setNumber] = useState(0);

  async function getUserID(){
    const result = await axios.get('/api/user/setID');
    console.log(result);
    const userID = result.data.userID;
    console.log("userID ---> ", userID);
    return userID
  };

  async function checkLocalstorage(){
    const localID = localStorage.getItem("userID");
    console.log(`checking local storage ${localID}`);
    if( localID === null ){
      console.log("setting userID")
      const userID = JSON.stringify( await getUserID() );
      localStorage.setItem( "userID", userID );
    } else {
      console.log("userID is present")
      return 
    };
  };

  useEffect( () => {
    checkLocalstorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <Router>
      <div className="App">
        <NavBar number={number} />
        <ErrorBoundary>
          <Route exact path={"/"}>
            <HomePage />
          </Route>      
          <Route path={"/search/:searchterm?"}>
            <SearchPage setNumber={setNumber} />
          </Route>
          <Route exact path={"/savedbooks"}>
            <SavedPage setNumber={setNumber} number={number} />
          </Route>
          <Route path={"/book/:book"}>
            <BookDetails setNumber={setNumber} />
          </Route>
        </ErrorBoundary>
      </div>
    </Router>
    
  );
}

export default App;

