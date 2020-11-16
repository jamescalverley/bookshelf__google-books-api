import React, { useEffect, useState} from 'react';
import './HomePage.css';
import HomeInput from '../HomeInput/HomeInput';
import { v4 as uuidv4 } from 'uuid';
import NyTimesBook from '../NyTimesBook/NyTimesBook';
const axios = require('axios');

function HomePage(props){
    // book states
    const [nytList, setNytList] = useState([]);
    const [nytTop5, setNytTop5] = useState([]);
    // display states
    const [nytDisplayAll, setNytDisplayAll] = useState(false);

    async function getNyTimesBooks(){
      try {
          const result = await axios.get('/api/');
          const resultsList = result.data.data.results.books;
          const nytTop5 = resultsList.slice(0,5);
          setNytList([...resultsList]);
          setNytTop5([...nytTop5]);
      } catch (err) {
          console.log("ERROR", err)
      } 
    };
  
    function handleDisplayChange(){
      setNytDisplayAll(prev => !prev);
    };

    useEffect(() => {
        getNyTimesBooks();
    }, [])

    return ( 
      <div className="search-page">
        <div className="hero-container">
          <div className="headline">
              Find your next great book.
          </div>
          <HomeInput />
        </div>
        
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
      </div>
    )
};

const memoHomePage = React.memo( HomePage );
export default memoHomePage;
//export default SearchPage;