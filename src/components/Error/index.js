import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.css';

// Helper functions
import { getUrlParam, findTranslation, findBookName, findBookId } from '../../helpers';


function Error({error, page}) {

    const code = error.code;
    const description = error.description;

  return (
    <div id="error">

      {
        code === 400 && page === "search" ? 
        <p>Le mot "{getUrlParam('value')}" n'existe pas dans la traduction {findTranslation(getUrlParam('translation'))}{getUrlParam('reference') === 'all' ? '.' : ` dans le livre "${findBookName(findBookId(getUrlParam('reference')))}".`} 
        <br/>Veuillez modifier vos termes de recherche. 
        <br/> Merci de noter que la recherche est sensible aux accents.
        </p>
        : code ? <p>Le serveur a rencontré un problème...</p> : <p>Le serveur n'a pas renvoyé de réponse. Veuillez vérifier votre connexion à internet.</p>
      }

      {
        description[0] ? 
        <p>Message renvoyé par le serveur :<br/>"
        <span>{description[0]}</span>"</p>
        : null
      }
      
    </div>
  )

}

Error.propTypes = {
  error: PropTypes.object,
  page: PropTypes.string
}

export default Error;