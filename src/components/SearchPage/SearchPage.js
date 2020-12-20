import React, { useEffect, useState} from 'react';
import './SearchPage.css';
import { useParams } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import SearchedBook from '../SearchedBook/SearchedBook';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SearchPage( { setBook } ){
  
  console.log("Render --- SearchPAGE");

    const params = useParams();
    const [booksList, setBooksList] = useState([]);
    const [searchDisplay, setSearchDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState();
    
    async function handleApiCall(searchTerm){
      console.log("[handleApiCall]", searchTerm);
      try {
          const result = await axios.get(`/api/search/${searchTerm}`)
          const resultsList = result.data.books;
          let checkedList = [];
          resultsList.map( book => checkedList.push( {
              bookID: book.id ? book.id : null,
              title: book.volumeInfo.title ? book.volumeInfo.title : "",
              subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "",
              authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
              textSnippet: book.searchInfo ? book.searchInfo.textSnippet : "",
              description: book.volumeInfo.description ? book.volumeInfo.description : "", 
              link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150",
              isbn: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : false
              }) 
          )
          setBooksList( checkedList );
          setSearchDisplay(true);
      } catch (err) {
          console.log("ERROR", err);
      };
    };

    useEffect(() => {
      console.log("useEffect")
      if( params.searchterm ){
        console.log("handleApiCall")
        //handleApiCall( params.searchterm);
        //setSearchTerm( params.searchterm.split('+').join(' ') )
      };
    }, [params.searchterm])

    return ( 
      <div className="search-page">
        
        <button onClick={setBook}>++ bookcount</button>
        <div className="search-header-container">
          <SearchInput apiCall={handleApiCall} />
        </div>
          { searchDisplay && 
            <div className="search-container">
              <h1>Search Results for 
                <span className="searchterm"> "{searchTerm}"</span>
              </h1>
              { booksList.map( book => 
                  <SearchedBook 
                    key={uuidv4()}
                    bookID={book.bookID} 
                    title={book.title}
                    subtitle={book.subtitle}
                    authors={book.authors}
                    textSnippet={book.textSnippet}
                    description={book.description}
                    link={book.link}
                    image={book.image}  
                    isbn={book.isbn}
                  />
              )}
            </div>
            }            
        </div>
    )
};

export default React.memo(SearchPage);