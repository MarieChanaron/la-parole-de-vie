import React from 'react';
import PropTypes from "prop-types";

// Styles
import './styles.css';

function Veil({display, displayTable, displayForm, handleClick}) {
  
  return (
    <div 
      className="veil" 
      display={display}
      displayform={displayForm} 
      displaytable={displayTable}
      onClick={handleClick} 
    />
  )
}

Veil.propTypes = {
  display: PropTypes.string, 
  displayTable: PropTypes.string, 
  displayForm: PropTypes.string, 
  handleClick: PropTypes.func
}

export default Veil;