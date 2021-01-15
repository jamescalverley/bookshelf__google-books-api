import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import SaveBtn from '../SaveBtn/SaveBtn';
import Saved from '../Saved/Saved';
import {motion} from 'framer-motion';
const axios = require('axios');

function BookDetails(props){

  const params = useParams();
  const title = params.book;
  
  const [bookDisplay, setBookDisplay] = useState(false);
  const [noBookDisplay, setNoBookDisplay] = useState(false);
  const [book, setBook] = useState({});
  const [saved, setSaved] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  };

  let isbnQuery = useQuery();
  
  function getUserID(){
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };

  async function getBookData(){
    try {
      const result = await axios.get(`/api/book/${title}?${isbnQuery}`);
      const foundBook = result.data.book.searchResult;
      const apiBook = result.data.book.book;
      if ( foundBook ){
        checkDB( apiBook.volumeInfo.title, apiBook.volumeInfo.industryIdentifiers );
        setBook({
          bookID: apiBook.id ? apiBook.id : null,
          title: apiBook.volumeInfo.title ? apiBook.volumeInfo.title : "",
          subtitle: apiBook.volumeInfo.subtitle ? apiBook.volumeInfo.subtitle : "",
          authors: apiBook.volumeInfo.authors ? apiBook.volumeInfo.authors[0] : "",
          textSnippet: apiBook.searchInfo ? apiBook.searchInfo.textSnippet : "",
          description: apiBook.volumeInfo.description ? apiBook.volumeInfo.description : "", 
          link: apiBook.volumeInfo.infoLink ? apiBook.volumeInfo.infoLink : "",
          image: apiBook.volumeInfo.imageLinks ? apiBook.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
          isbn: apiBook.volumeInfo.industryIdentifiers ? apiBook.volumeInfo.industryIdentifiers : false
          });
          setBookDisplay(true);
      } else {
          setNoBookDisplay(true);
      }
    } catch (err) {
      console.log("ERROR", err)
    };
  };

  async function checkDB( title, isbns ){
    try {
      if ( isbns.length > 0 ){
        const isbn10 = isbns[0].identifier;
        const isbn13 = isbns[1].identifier;
        const userID = await getUserID();
        console.log(`isbns present ${isbn10} & ${isbn13}`);
        console.log(`Checking --- ${title}`);
        const result = await axios.get(`/api/checkdb/${title}?isbn10=${isbn10}&isbn13=${isbn13}&userID=${userID}`);
        console.log("CHECK-DB", result);
        if( result.data.bookSaved ){
          console.log("SAVED IN DB");
          setSaved(true)
        }
      }
    } catch (err) {
        console.log("ERROR", err)
    }
  };

  async function saveBook(){
    try {
      const userID = await getUserID();
      // eslint-disable-next-line no-unused-vars
      const result = await axios.post(`/api/savebook/${userID}`, book);
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    saveBook();
    setSaved(true);
  };

  let history = useHistory();
  function handleBack(){
    history.goBack();
  };
  
  useEffect( () => {
    getBookData();
    checkDB( title, isbnQuery );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      { bookDisplay && 
        <div className="book-details-page">
          <button className="backBtn" onClick={handleBack}>Back</button>
          <div className="book-details-container">
            <div className="book-details-image">
              <img src={book.image} alt="book-cover"/>        
            </div>
            <div className="book-details">
              <h2>{book.title}</h2>
              <h3>{book.subtitle}</h3>
              <h4>{book.authors}</h4>
              <p>{book.description}</p> 
              <div className="book-links">
                { !saved ? 
                  <SaveBtn handleSave={handleSave} />
                  :
                  <Saved />
                }
                <a href={book.link} target="_blank" rel="noopener noreferrer">Preview</a>
              </div>    
            </div>
          </div>
        </div>
      }
      { noBookDisplay &&
        <div className="book-details-page">
          <div className="nobook-container">
            <h1>Book Details Not Available</h1>
            <motion.button 
              onClick={handleBack}
              whileHover={{ scale: 1.25, color: '#FFF', backgroundColor: '#ED696A'  }}
            >
              Back
            </motion.button>
          </div>
        </div>
        
      
       

      }
    </>
  )
};

export default BookDetails;