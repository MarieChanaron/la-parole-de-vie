import React from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly, isMobileSafari, isFirefox } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import Form from '../Form';


function FirstQueryForm({height}) {

  return (
    <>
      <div 
        id="firstQueryForm" 
        ismobileonly={isMobileOnly ? "true" : "false"}
        ismobilesafari={isMobileSafari ? "true" : "false"}
        isfirefox={isFirefox ? "true" : "false"}
        style={height ? {height: height} : null} // For Firefox mobile only
      >
        <div>
            <h1>Recherche de versets bibliques</h1>
            <Form />
        </div>
      </div>
    </>
  )
}

FirstQueryForm.propTypes = {
  height: PropTypes.number
}

export default FirstQueryForm;