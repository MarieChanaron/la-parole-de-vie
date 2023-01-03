import React, { useEffect } from 'react';
import { isTablet, isMobileOnly, isDesktop } from 'react-device-detect';

// Style
import './styles.css';

// Components
import Banner from '../../components/Banner';
import Reader from '../../components/Reader';


function BibleReaderPage() {

  useEffect( () => {
    document.body.classList.add('scroll'); // For narrow page (desktop or mobile)
    if (isDesktop) {
      document.body.classList.add('page-scroll'); // For low page in the height, on desktop only
    }
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