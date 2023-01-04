import React from 'react';
import PropTypes from "prop-types";

// Styles
import './styles.css';

// Helpers
import { cutString } from '../../helpers';


function VerseText({text, selected}) {

    const array = cutString(text);
  
    const importantWords = ['Dieu', 'DIEU', 'Jésus-Christ', 'JESUS-CHRIST', 'Jésus', 'JESUS', 'JÉSUS', 'Christ', 'CHRIST', "l'Eternel", "L'Eternel", "L'Éternel", "l'Éternel", 'Père', 'Fils', 'Saint-Esprit'];

    return (
        <>
            {
                selected === "selected" ?
                <>
                    <span className='bracket'>&#91;</span>
                    <span>&nbsp;</span>
                </>
                : null
            }
            {
                array.map(
                    (item, index) => 
                        importantWords.includes(item) ? <span key={index} className='important'>{item}</span> : item
                )
            }
            {
                selected === "selected" ?
                <>
                    <span>&nbsp;</span>
                    <span className='bracket'>&#93;</span>
                </>
                : null
            }
        </>
    )
}

VerseText.propTypes = {
    text: PropTypes.string
}

export default VerseText;