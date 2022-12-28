import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.css';


function Error({error}) {

    const code = error.code;
    const description = error.description;

  return (
    <div id="error">
        <h2>Erreur {code}</h2>
        <p>{description[0]}</p>
        { code === 400 ? <p>Veuillez saisir votre recherche différemment.</p> : null }
    </div>
  )

}

Error.propTypes = {
  error: PropTypes.object
}

export default Error;