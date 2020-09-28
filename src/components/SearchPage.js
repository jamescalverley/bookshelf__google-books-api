import React, {useState} from 'react';
import Input from './Input';
import Book from './Book';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SearchPage(){

    const [booksList, setBooksList] = useState([]);

    async function handleApiCall(searchTerm){
        console.log("[handleApiCall]", searchTerm);
        try {
            const result = await axios.get(`/api/search/${searchTerm}`)
            const resultsList = result.data.books;
            console.log("LIST", resultsList); 
            setBooksList([...resultsList]);
        } catch (err) {
            console.log("ERROR", err)
        };
    };

    console.log("booksList", booksList)

    return ( 
        <div className="search-page">
            <h1>SearchPage</h1>
            <Input apiCall={handleApiCall} />
            { booksList.map( book => 
                <Book 
                    key={uuidv4()}
                    bookID={book.id} 
                    book={book}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                    infoLink={book.volumeInfo.infoLink}   
                />
            )}            
        </div>
    )
};

export default SearchPage;