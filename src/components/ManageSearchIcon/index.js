import React from 'react';
import PropTypes from "prop-types";
import { isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Icon
import closePaneInverse from '../../images/icons/close-pane-inverse.svg';
import manageSearch from '../../images/icons/manage-search.svg';


function ManageSearchIcon({showForm, setShowForm}) {

  return (
      <img
        id="manageSearchIcon" 
        src={showForm ? closePaneInverse : manageSearch}
        alt="" 
        onClick={() => setShowForm(prev => !prev)} 
        position={showForm ? 'translate' : null} 
        ismobileonly={isMobileOnly ? "true" : "false"}
      />
  )
}

ManageSearchIcon.propTypes = {
  showForm: PropTypes.bool,
  setShowForm: PropTypes.func
}

export default ManageSearchIcon;