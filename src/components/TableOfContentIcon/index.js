import React from 'react';
import PropTypes from "prop-types";
// import { isMobileOnly } from 'react-device-detect';

// Icon
import tableOfContent from '../../images/icons/table-of-content.svg';
import closePane from '../../images/icons/close-pane.svg';

// Style
import './styles.css';

function TableOfContentIcon({showTable, setShowTable}) {

  return (
    <img 
        id="tableOfContentIcon"
        src={showTable ? closePane : tableOfContent}
        alt="" 
        onClick={() => setShowTable(prev => !prev)} 
        position={showTable ? 'right' : null} 
        // ismobileonly={isMobileOnly ? "true" : "false"}
    />
  )
}

TableOfContentIcon.propTypes = {
  showTable: PropTypes.bool, 
  setShowTable: PropTypes.func
}

export default TableOfContentIcon;