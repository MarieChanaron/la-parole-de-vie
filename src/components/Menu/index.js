import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

// Styles
import './styles.css';

// React Router 
import { Link } from 'react-router-dom';

// Components
import Button from '../Button';

// Images
import mobileMenu from '../../images/icons/jam_menu.svg';
import closeMenu from '../../images/icons/close-menu.svg';


function Menu() {

  const [visible, setVisible] = useState(false);

  const burgerMenuRef = React.useRef();


  useEffect( () => {
    const handleClickOutside = event => {
      if (event.target !== burgerMenuRef.current) {
        setVisible(false);
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [visible]);


  const toggle = () => {
    setVisible(prev => !prev);
  }

  const reset = () => {
    setVisible(false);
  }


  return (
    <div id="menu">
      <img 
        src={visible ? closeMenu : mobileMenu} 
        alt="" 
        onClick={toggle} ref={burgerMenuRef} 
      />
      <div className={`buttons ${visible}`}>
        <Link to='/' onClick={reset}>
          <Button className='button' text='Accueil' />
        </Link>
        <Link to='/read?translation=martin&reference=Gen'onClick={reset}>
          <Button className='button' text='Lire la Bible' />
        </Link>
      </div>
    </div>
  )
}

Menu.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
}

export default Menu;