import React from 'react';
import Input from './Input';

function SearchPage(){

    function handleApiCall(search){
        console.log("[handleApiCall]", search)
    };


    return ( 
        <div className="search-page">
            <h1>SearchPage</h1>
            <Input apiCall={handleApiCall}/>
        </div>
    )
};

export default SearchPage;