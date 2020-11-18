/* eslint-disable no-unused-vars */
import React, { useEffect, useState} from 'react';
import './HomePage.css';
import HomeInput from '../HomeInput/HomeInput';
import { v4 as uuidv4 } from 'uuid';
import FeaturedBook from '../FeaturedBook/FeaturedBook';
import TopBook from '../TopBook/TopBook';
import NyTimesBook from '../NyTimesBook/NyTimesBook';
const axios = require('axios');

function HomePage(props){
    // book states
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [topBooks, setTopBooks] = useState([]);
    const [nytNonFiction, setNytNonFiction] = useState([]);
    const [t5NonFiction, setT5NonFiction] = useState([]);
    const [nytFiction, setNytFiction] = useState([]);
    const [t5Fiction, setT5Fiction] = useState([]);
    // display states
    const [apiBookDisplay, setApiBookDisplay] = useState(false);
    const [fictionDisplay, setFictionDisplay] = useState(false);
    const [nonFictionDisplay, setNonFictionDisplay] = useState(false);

    console.log("---", featuredBooks)

    async function getFeatured(){
      try {
        const result = await axios.get('/api/featured');
        console.log(result)
        const resultsList = result.data.data.results.books.slice(0,6);
        console.log("FEATURED", resultsList);
        setFeaturedBooks( [...resultsList] );
        setApiBookDisplay(true);
      }
       catch (err) {
        console.log("ERROR", err)
      };
    };

    async function getTopBooks(){
      try {
        const result = await axios.get('/api/topbooks');
        const resultsList = result.data.data;
        console.log("TOP BOOKS", resultsList);
        setTopBooks([...resultsList])
      }
       catch (err) {
        console.log("ERROR", err)
      };
    };

    async function getNytNonFiction(){
      try {
        const result = await axios.get('/api/nytnonfiction');
        const resultsList = result.data.data.results.books;
        const nytTop5 = resultsList.slice(0,5);
        setNytNonFiction([...resultsList]);
        setT5NonFiction([...nytTop5]);
      } catch (err) {
          console.log("ERROR", err)
      } 
    };
    async function getNytFiction(){
      try {
        const result = await axios.get('/api/nytfiction');
        const resultsList = result.data.data.results.books;
        const nytTop5 = resultsList.slice(0,5);
        setNytFiction([...resultsList]);
        setT5Fiction([...nytTop5]);
      } catch (err) {
          console.log("ERROR", err)
      }
    };

    // view all button hidden for now

    // function handleDisplayChange(){
    //   setNonFictionDisplay(prev => !prev);
    // };

    useEffect(() => {
      getTopBooks();
      getFeatured();
      getNytNonFiction();
      getNytFiction();
    }, [])

    return ( 
      <div className="search-page">
        <div className="hero-container">
          <div className="headline">
              Find your next great book.
          </div>
          <HomeInput />
        </div>
        { apiBookDisplay &&
          <div className="main-content-container">
            <div className="highlighted-books">
              <div className="featured-container">
                <div className="featured-header">
                  <h2>Featured Books</h2>
                </div>
                <div className="featured-flex">
                  { featuredBooks.map( book => 
                    <FeaturedBook 
                      key={uuidv4()}
                      book={book}
                    />
                  )}
                </div>
              </div>
              <div className="topbooks-container">
                <h2>Top Books</h2>
                { topBooks.map( book => 
                  <TopBook
                    key={uuidv4()}
                    book={book.items[0]}
                  />
                )}
              </div>
            </div>
            <div className="nyt-container">
                <h2>NY Times Best Sellers - Non-Fiction</h2>
                {/* <button onClick={handleDisplayChange}>{ !nonFictionDisplay ? "View All" : "View Less" }</button> */}
                { !nonFictionDisplay ? 
                  <div className="nyt-results top5">
                    { t5NonFiction.map( nytbook => 
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
                    { nytNonFiction.map( nytbook => 
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
            <div className="nyt-container">
              <div className="nyt-header">
                <h2>NY Times Best Sellers - Fiction</h2>
                {/* <button onClick={handleDisplayChange}>{ !nonFictionDisplay ? "View All" : "View Less" }</button> */}
              </div>
              <div className="nyt-results top5">
                { t5Fiction.map( nytbook => 
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
            </div>
          </div> 
        }     
      </div>
    )
};

const memoHomePage = React.memo( HomePage );
export default memoHomePage;
//export default SearchPage;