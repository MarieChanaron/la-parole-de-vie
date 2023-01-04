import React from 'react';
import { isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Image
import bibleSuperSearch from '../../images/bible-supersearch.png';


function Footer() {

  return (

    <footer 
      ismobileonly={isMobileOnly ? "true" : "false"}
    >

      <div className="col">
        <span>Alimenté par</span>
        <img src={bibleSuperSearch} alt="BIBLE SuperSearch" />
      </div>

      <a href="mailto:chanaronmarie@gmail.com" className="col">Contact</a>

      <p className="col center">© {new Date().getFullYear()} ~ Tous droits réservés </p>

    </footer>
    
  )

}

export default Footer;