import React from 'react';
import PropTypes from "prop-types";

// Styles
import './styles.css';

// Helpers
import { cutString } from '../../helpers';


function VerseText({text}) {

    const array = cutString(text);
  
    const importantWords = ['Dieu', 'DIEU', 'Jésus-Christ', 'JESUS-CHRIST', 'Jésus', 'JESUS', 'JÉSUS', 'Christ', 'CHRIST', "l'Eternel", "L'Eternel", "L'Éternel", "l'Éternel", 'Père', 'Fils', 'Saint-Esprit'];

    return (
        <>
            {
                array.map(
                    (item, index) => 
                        importantWords.includes(item) ? <span key={index} className='important'>{item}</span> : item
                )
            }
        </>
    )
}

VerseText.propTypes = {
    text: PropTypes.string
}

export default VerseText;