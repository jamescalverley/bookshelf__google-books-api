import React, { useEffect, useState } from 'react';
import SavedBook from '../SavedBook/SavedBook';
import NoBooks from '../NoBooks/NoBooks';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SavedPage(){
    console.log("SavedPage loading")
    const [booksList, setBooksList] = useState([]);
    
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
            console.log(result);
            const savedBooks = result.data.savedBooks;
            setBooksList([...savedBooks]);
        } catch (err) {
            console.log("ERROR", err);
        };
    };

    useEffect( () => {
        getSavedBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>            
            { booksList.length > 0 ? 
                booksList.map( book => 
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
                    />)
                : 
                    <NoBooks />
            }
        </>
    ); 
};

export default SavedPage;