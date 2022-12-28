import React from 'react';
import PropTypes from "prop-types";
import { isTablet } from 'react-device-detect';

// Styles
import './styles.css';

// Icon
import manageSearch from '../../images/icons/manage-search.svg';
import closePane from '../../images/icons/close-pane.svg';

function Nail({showLeftPane, setShowLeftPane}) {

    const translate = () => {
        showLeftPane === "hide" ? setShowLeftPane('show') : setShowLeftPane('hide');
    }

    return (
        <div 
            id="nail" 
            onClick={translate} 
            position={showLeftPane === 'show' ? 'right' : null} 
            istablet={isTablet ? "true" : "false"}
        >
            {showLeftPane === 'hide' ? <span>&nbsp;&nbsp;Critères</span> : null}
            
            <img src={showLeftPane === 'hide' ? manageSearch : closePane} alt="" />
        </div>
    )
}

Nail.propTypes = {
    showLeftPane: PropTypes.string,
    setShowLeftPane: PropTypes.func
}

export default Nail;