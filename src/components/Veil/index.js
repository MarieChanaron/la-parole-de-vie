import React from 'react';
import PropTypes from "prop-types";
import { isMobileOnly } from 'react-device-detect';

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
      ismobileonly={isMobileOnly ? "true" : "false"}
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