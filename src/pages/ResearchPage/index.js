import React, { useEffect } from 'react';
import { isTablet } from 'react-device-detect';

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
      istablet={isTablet ? "true" : "false"}
      style={isTablet ? {height: window.innerHeight} : null}
    >
        <Banner />
        <ResearchFrame />
    </div>
  )
}

export default ResearchPage;