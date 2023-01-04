import React from "react";
import PropTypes from "prop-types";
import { isMobileOnly, isTablet } from "react-device-detect";

// Style
import "./styles.css";

// Components
import Verse from "../Verse";


function Grid({results}) {

  return (
    <div 
      id="grid" 
      isresult={results.length > 0 ? 'true' : 'false'} 
      istablet={isTablet ? "true" : "false"}
      ismobileonly={isMobileOnly ? "true" : "false"}
    >
      
      {
        Object.entries(results).map(
          verse => {
            return (
              <Verse
                id={verse[0]}
                key={verse[0]}
                content={verse[1]}
                testament={verse[1].book.id <= 39 ? 'ot' : 'nt'}
              />
            );
        })
      }
      
    </div>
  );
}

Grid.propTypes = {
  results: PropTypes.array
}

export default Grid;