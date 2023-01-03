import React from 'react';
// import { isMobileSafari } from 'react-device-detect';

// Styles
import './styles.css';

// Icon
import icon from '../../images/icons/no-results.png';

function NotFound() {

  return (
    <div 
      id="notFound"
      // isMobileSafari={isMobileSafari ? "true" : "false"}
    >
      <img src={icon} alt="aucun résultat" />
      <p>Aucun verset . . .</p>
    </div>
  )

}

export default NotFound;