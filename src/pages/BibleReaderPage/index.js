import React, { useEffect } from 'react';
import { isTablet, isMobileOnly } from 'react-device-detect';

// Style
import './styles.css';

// Components
import Banner from '../../components/Banner';
import Reader from '../../components/Reader';


function BibleReaderPage() {

  useEffect( () => {
    document.body.classList.add('scroll');
  }, []);

  return (
      <div 
        id="bibleReaderPage" 
        istablet={isTablet ? "true": "false"}
        ismobileonly={isMobileOnly ? "true" : "false"}
        style={isTablet ? {height: window.innerHeight} : null}
      >
        <Banner />
        <Reader />
      </div>
  )
  
}

export default BibleReaderPage;