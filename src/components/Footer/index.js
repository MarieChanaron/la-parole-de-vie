import React from 'react';
import PropTypes from 'prop-types';
// import { isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Image
import bibleSuperSearch from '../../images/bible-supersearch.png';


function Footer() {

  return (

    <footer 
      // ismobileonly={isMobileOnly ? "true" : "false"}
    >

      <div className="col">
        <span>Alimenté par</span>
        <img src={bibleSuperSearch} alt="BIBLE SuperSearch" />
      </div>

      <a href="mailto:chanaronmarie@gmail.com" className="col">Contact</a>

      <p className="col center">© 2022 ~ Tous droits réservés </p>

    </footer>
    
  )

}

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer;