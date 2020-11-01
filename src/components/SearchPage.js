import React, { useEffect, useState} from 'react';
import Input from './Input';
import SearchedBook from './SearchedBook';
import { v4 as uuidv4 } from 'uuid';
import NyTimesBook from './NyTimesBook';
const axios = require('axios');

function SearchPage(props){
    // book states
    const [booksList, setBooksList] = useState([]);
    const [nytList, setNytList] = useState([]);
    const [nytTop5, setNytTop5] = useState([]);
    // display states
    const [featuredDisplay, setFeaturedDisplay] = useState(true);
    const [nytDisplayAll, setNytDisplayAll] = useState(false);

    async function getNyTimesBooks(){
        try {
            const result = await axios.get('/api/');
            console.log("NY TIMES ---", result );
            const resultsList = result.data.data.results.books;
            console.log("NYT >>> ", resultsList);
            const nytTop5 = resultsList.slice(0,5);
            console.log("NYT 5 >>> ", nytTop5);
            setNytList([...resultsList]);
            setNytTop5([...nytTop5])
        } catch (err) {
            console.log("ERROR", err)
        } 
    };

    async function handleApiCall(searchTerm){
        console.log("[handleApiCall]", searchTerm);
        try {
            const result = await axios.get(`/api/search/${searchTerm}`)
            const resultsList = result.data.books;
            console.log("LIST", resultsList); 
            setBooksList([...resultsList]);
        } catch (err) {
            console.log("ERROR", err);
        };
    };

    function handleDisplayChange(){
        setNytDisplayAll(prev => !prev);
    };

    useEffect((props) => {
        getNyTimesBooks();
    }, [])

    return ( 
        <div className="search-page">
            <Input apiCall={handleApiCall} setFeaturedDisplay={setFeaturedDisplay}/>
            { featuredDisplay &&
                <div className="nyt-container">
                    <div className="nyt-header">
                        <h2>New York Times Bestseller List</h2>
                        <button onClick={handleDisplayChange}>{ !nytDisplayAll ? "View All" : "View Less" }</button>
                    </div>
                    { !nytDisplayAll ? 
                        <div className="nyt-results top5">
                            { nytTop5.map( nytbook => 
                                <NyTimesBook 
                                    key={uuidv4()}
                                    title={nytbook.title}
                                    author={nytbook.author}
                                    description={nytbook.description}
                                    rank={nytbook.rank}
                                    weeks={nytbook.weeks_on_list}
                                    image={nytbook.book_image}
                                    isbn={nytbook.isbns[0].isbn10}
                                />
                            )}
                        </div>
                    : 
                        <div className="nyt-results all">
                            { nytList.map( nytbook => 
                                <NyTimesBook 
                                    key={uuidv4()}
                                    title={nytbook.title}
                                    author={nytbook.author}
                                    description={nytbook.description}
                                    rank={nytbook.rank}
                                    weeks={nytbook.weeks_on_list}
                                    image={nytbook.book_image}
                                    isbn={nytbook.isbns[0].isbn10}
                                />
                            )}
                        </div>
                    }     
                </div>
            }
            { !featuredDisplay && 
                <div className="search-container">
                    <h1>SearchPage</h1>
                    { booksList.map( book => 
                        <SearchedBook 
                            key={uuidv4()}
                            bookID={book.id} 
                            book={book}
                            title={book.volumeInfo.title}
                            subtitle={book.volumeInfo.subtitle}
                            authors={book.volumeInfo.authors}
                            textsnippet={book.searchInfo.textSnippet}
                            description={book.volumeInfo.description}
                            link={book.volumeInfo.infoLink}
                            //image={book.volumeInfo.imageLinks.thumbnail}
                            setSavedNum={props.setSavedNum}   
                            isbn={book.volumeInfo.industryIdentifiers[0].identifier}
                        />
                    )}
                </div>
            }            
        </div>
    )
};


export default SearchPage;