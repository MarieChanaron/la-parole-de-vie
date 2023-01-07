import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isFirefox, isMobileOnly, isTablet } from "react-device-detect";

// Styles
import "./styles.css";

// Helper function
import { 
    redirectToSearchUrl, 
    getUrlParam, 
} from "../../helpers";


function LightForm({boxShadow, setFormFocus}) {

    const [scrollPos, setScrollPos] = useState(); // To save the scroll position for mobile as the window moves on opening the virtual keyboard
  
    const refInput = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();
        const translation = getUrlParam('translation');
        const reference = getUrlParam('reference');
        let value = '';
        refInput.current.value.length > 0 ? value = refInput.current.value : value = "vie éternelle";
        redirectToSearchUrl(translation, reference, value);
    }


    useEffect(() => {
        // Get the value param and fill the input text with it
        refInput.current.value = getUrlParam('value');
    }, [] /* eslint-disable-line react-hooks/exhaustive-deps */
    );

    const handleFocus = event => {
        setScrollPos(window.scrollY);
        event.target.setSelectionRange(0,refInput.current.value.length);
        if (isFirefox && isMobileOnly) {
            setFormFocus(true);
        }
    }

    const handleBlur = () => {
        if (isFirefox && isMobileOnly) {
            setFormFocus(false);
        }
        if (isMobileOnly) {
            const timeout = setTimeout(
              () => window.scrollTo(0, scrollPos),
              100 // add a delay so when the user clicks on a verse, the event handler of the click runs first
            );
            return () => clearTimeout(timeout);
          }
    }

    return(

        <form 
            id="lightForm" 
            onSubmit={handleSubmit} 
            istablet={isTablet ? "true" : "false"}
            ismobileonly={isMobileOnly ? "true" : "false"}
        >

            <div boxshadow={boxShadow === false ? 'none' : null}>
                <input
                    name="keyword"
                    id="keyword"
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={refInput}
                    placeholder="Exemple : vie éternelle"
                />
                <input id="icon" type="submit" value='' />
            </div>

        </form>            

    );

}

LightForm.propTypes = {
    boxShadow: PropTypes.bool,
    setFormFocus: PropTypes.func
}

export default LightForm;



// For query forms I choose to use uncontrolled components.
// I do not wish to use controlled components because it would launch a request each time I type a letter, and the web API blocks my IP address if I send too many requests to the server per hour/day. 
// It would slow down my laptop when the internet broadband is slow.
// I wish to send form values only when the user submits the form.