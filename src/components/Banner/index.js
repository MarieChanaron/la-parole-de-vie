import React from 'react';
import PropTypes from 'prop-types';
import { isMobile, isTablet, isMobileOnly } from 'react-device-detect';

// React Router
import { Link } from 'react-router-dom';

// Styles
import './styles.css';

// Images
import logo from '../../images/parole-de-vie.png';

// Components
import Menu from '../Menu';


function Banner({transparency}) {

  return (
    <header 
      id="banner" 
      ismobile={isMobile ? "true" : "false"} 
      ismobileonly={isMobileOnly ? "true" : "false"}
      istablet={isTablet ? "true": "false"}
      transparency={transparency} 
    >

        <div className="top">
          <Link to='/'>
            <img id="logo" src={logo} alt="La Parole de Vie"/>
          </Link>
          <Menu />
        </div>

        <div id="quote" className="shadow">
          <p>
            La Parole de Dieu est vivante et efficace, et plus pénétrante que nulle épée à deux tranchants, et elle atteint jusques à la division de l'âme, de l'esprit, des jointures et des mœlles, et elle est juge des pensées et des intentions du cœur. ~ Hébreux 4:12
          </p>
        </div>

    </header>
  )
}

Banner.propTypes = {
  transparency: PropTypes.string
}

export default Banner;