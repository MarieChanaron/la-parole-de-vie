import React from "react";
import PropTypes from "prop-types";
import { isMobileSafari, isTablet, isMobileOnly } from "react-device-detect";

// Styles
import './styles.css';

// Components
import Grid from "../Grid";
import Loader from "../Loader";
import Error from '../Error';
import NotFound from "../NotFound";


function ResultPane({results, error, loading, nb}) {
  

  return (

    <div 
      id="resultPane" 
      istablet={isTablet ? "true" : "false"}
      ismobilesafari={isMobileSafari ? "true" : "false"}
      ismobileonly={isMobileOnly ? "true" : "false"}
    >

      { 
        error 
        ? 
          <div id="searchErrorContainer">
            <Error error={error} />
          </div> 
        : null
      }

      { !nb ? <NotFound /> : null }

      <Grid results={results} />

      {
        loading
        ?
          <div
            id="searchLoaderWrapper"
            isresult={results.length > 0 ? 'true' : 'false'}
          >
            <Loader />
          </div>
        : null
      }

    </div>

  );

}

ResultPane.propTypes = {
  results: PropTypes.array,
  error: PropTypes.object, 
  loading: PropTypes.bool, 
  nb: PropTypes.bool
}

export default ResultPane;