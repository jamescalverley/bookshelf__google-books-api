import React from 'react';

function SaveBtn(props){

  return (
    <button className="save-button" onClick={props.handleSave}>Save</button>
  )
};

export default SaveBtn;