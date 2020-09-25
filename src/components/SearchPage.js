import React, {useState} from 'react';
import Input from './Input';
import Results from './Results'

function SearchPage(){

    const [resultsDisplay, setResultsDisplay] = useState(false);


    function handleApiCall(search){
        console.log("[handleApiCall]", search)
    };

    function showResults(){
        setResultsDisplay(true)
    };


    return ( 
        <div className="search-page">
            <h1>SearchPage</h1>
            <Input 
                apiCall={handleApiCall}
                showResults={showResults}
            />
            {resultsDisplay && 
                <Results />
            }
            
        </div>
    )
};

export default SearchPage;