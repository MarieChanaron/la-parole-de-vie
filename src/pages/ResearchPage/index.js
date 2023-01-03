import React, { useEffect } from 'react';
// import { isTablet, isMobileOnly } from 'react-device-detect';

// Style
import './styles.css';

// Components
import Banner from '../../components/Banner';
import ResearchFrame from '../../components/ResearchFrame';


function ResearchPage() {

  useEffect( () => {
    document.body.classList.add('scroll');
  }, []);

  return (
    <div 
      id="researchPage" 
      istablet="true"
      // istablet={isTablet ? "true" : "false"}
      // ismobileonly={isMobileOnly ? "true" : "false"}
      // style={isTablet ? {height: window.innerHeight} : null}
      style={{height: window.innerHeight}}
    >
        <Banner />
        <ResearchFrame />
    </div>
  )
}

export default ResearchPage;