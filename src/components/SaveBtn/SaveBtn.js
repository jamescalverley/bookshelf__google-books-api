import React from 'react';
import './SaveBtn.css';

function SaveBtn(props){

  return (
    <button className="save-button" onClick={() => {props.handleSave(); props.onSave()}}>Save</button>
  )
};

export default React.memo(SaveBtn);