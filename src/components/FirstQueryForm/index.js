import React from 'react';
import { isMobileOnly, isMobileSafari } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import Form from '../Form';


function FirstQueryForm({height, setFocus}) {

  return (
    <>
      <div 
        id="firstQueryForm" 
        ismobileonly={isMobileOnly ? "true" : "false"}
        ismobilesafari={isMobileSafari ? "true" : "false"}
        style={height ? {height: height} : null} // For Firefox mobile only
      >
        <div>
            <h1>Recherche de versets bibliques</h1>
            <Form setFocus={setFocus} />
        </div>
      </div>
    </>
  )
}

export default FirstQueryForm;