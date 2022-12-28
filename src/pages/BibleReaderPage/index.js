import React, { useEffect } from 'react';
import { isTablet } from 'react-device-detect';

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
        style={isTablet && window.innerWidth > 768 && window.innerWidth <= 1200 ? {height: window.innerHeight} : null}
      >
        <Banner />
        <Reader />
      </div>
  )
  
}

export default BibleReaderPage;