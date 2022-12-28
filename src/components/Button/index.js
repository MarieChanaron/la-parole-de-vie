import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.css';


function Button({id, className, text, handleClick, disabled}) {

  return (
    <button 
      id={id} 
      className={className} 
      onClick={handleClick} 
      disabled={disabled}
    >
      {text}
    </button>
  )

}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button;