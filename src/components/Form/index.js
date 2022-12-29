import React, { useEffect, useState } from "react";
import { isFirefox, isMobileOnly } from "react-device-detect";

// Styles
import "./styles.css";

// Import option values
import {bible} from '../../data/testaments.js';

// Helper function
import { 
    redirectToSearchUrl, 
    getUrlParam
} from "../../helpers";
import { 
    addTranslationOptions, 
    fillBookSelectInput 
} from "../../helpers/formFunctions";


function Form() {

  
    const inputRef = React.createRef();
    const translationRef = React.createRef();
    const bookRef = React.createRef();

    const [focus, setFocus] = useState(false);

    console.log(focus);

    const handleSubmit = e => {
        e.preventDefault();
        const sendQuery = () => {
            const translation = translationRef.current.value;
            const reference = bookRef.current.value;
            let value = inputRef.current.value.length > 0 ? inputRef.current.value : "vie éternelle";
            redirectToSearchUrl(translation, reference, value);
        }
        if (isMobileOnly && isFirefox) {
            setTimeout( () => sendQuery(), 100 );
        } else {
            sendQuery();
        }
        
    }


    useEffect(() => {

        // Fill the books select options
        fillBookSelectInput(
            bible, 
            document.querySelector('select#book'), 
            getUrlParam('reference')
        );

        // Get the value param and fill the input text with it
        inputRef.current.value = getUrlParam('value');

        // Get the translation param and fill the translation select input with it
        const translation = getUrlParam('translation');
        if (translation) {translationRef.current.value = translation;}

    }, [] /* eslint-disable-line react-hooks/exhaustive-deps */
    );


    const handleFocus = event => {
        event.target.setSelectionRange(0,inputRef.current.value.length);
        setFocus(true);
    }

    return(

        <form 
            id="searchForm" 
            onSubmit={handleSubmit}
        >

            <label htmlFor="keyword">Termes de recherche</label>
                <div id="inputText">
                    <input
                        name="keyword"
                        id="keyword"
                        type="text"
                        onFocus={handleFocus}
                        onBlur={() => setFocus(false)}
                        ref={inputRef}
                        placeholder="Exemple : vie éternelle"
                        hasfocus={focus ? "true" : "false"}
                    />
                <input 
                    id="icon" 
                    type="submit" 
                    value='' 
                    onClick={() => isFirefox && isMobileOnly ? inputRef.current.blur() : undefined}
                />
            </div>

            <label htmlFor="book">Livre</label>
            <select name="book" id="book" ref={bookRef}>
                <option value="all">Tous les livres</option>
                {/* The other list elements are added to the DOM in the useEffect() hook */}
            </select>

            <label htmlFor="translation">Traduction</label>
            <select name="translation" id="translation" ref={translationRef} >
                { addTranslationOptions() }
            </select>
            
            <input className="button" type="submit" value="Rechercher" />   

        </form>            

    );

}

export default Form;



// For query forms I choose to use uncontrolled components.
// I do not wish to use controlled components because it would launch a request each time I type a letter, and the web API blocks my IP address if I send too many requests to the server per hour/day. 
// It would slow down my laptop when the internet broadband is slow.
// I wish to send form values only when the user submits the form.