import React, { useEffect, useState } from 'react';
import './SavedPage.css';
import SavedBook from '../SavedBook/SavedBook';
import NoBooks from '../NoBooks/NoBooks';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SavedPage (props){
  console.log("SavedPage loading")
  const [booksList, setBooksList] = useState([]);
  const [booksDisplay, setBooksDisplay] = useState(0);

  function getUserID(){
    console.log("getting userID from local storage");
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
};

  async function getSavedBooks(){
    console.log("[getSavedBooks] ----");
    try {
      const userID = await getUserID();
      const result = await axios.get(`/api/savedbooks/${userID}`);
      const savedBooks = result.data.savedBooks;
      setBooksList([...savedBooks]);
      const bookCount = savedBooks.length;
      setBooksDisplay( bookCount );
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  useEffect( () => {
    getSavedBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksDisplay])

  return (
    <div className="savedpage">
      { booksDisplay > 0 ? 
        <div>
          <h2>Saved Books</h2>
          <div className="saved-books-container">
            { booksList.map( book => 
              <SavedBook 
                key={uuidv4()}
                dbID={book._id}
                bookID={book.bookID} 
                title={book.title}
                authors={book.authors}
                textSnippet={book.textSnippet}
                description={book.description}
                infoLink={book.infoLink}   
                image={book.image}
                isbn={book.isbn}
                setNumber={props.setNumber}
                setBooksDisplay={setBooksDisplay}
              />)
            }
          </div>
        </div>
        : 
        <NoBooks />
      }


      
     
    </div>
  ); 
};
const memoSavedPage = React.memo( SavedPage );
export default memoSavedPage;
//export default SavedPage;