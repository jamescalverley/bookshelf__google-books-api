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
            console.log("result", result);
            const resultsList = result.data.data.items;
            console.log("LIST", resultsList); 
            setBooksList([...resultsList]);
        } catch (err) {
            console.log("ERROR", err)
        };
    };

    return ( 
        <div className="search-page">
            <h1>SearchPage</h1>
            <Input apiCall={handleApiCall} />
            { booksList.map( bookResult => 
                <Book book={bookResult} key={uuidv4()} />
            )}            
        </div>
    )
};

export default SearchPage;