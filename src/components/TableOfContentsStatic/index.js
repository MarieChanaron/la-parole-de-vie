import React, { useEffect, useRef } from 'react';
import { isTablet } from 'react-device-detect';

// Styles
import './styles.css';
import './globalstyles.css';

// Helper function
import { fillTableOfContents } from '../../helpers/fillTableOfContents';


function TableOfContentsStatic() {

  const containerRef = useRef();

  // Scroll to see the selected element on the center of the table of contents
  const scroll = () => {
    const element = document.querySelector('.selected');
    if (element) {
      element.scrollIntoView({block: 'center'});
    }
  }

  // On first loading
  useEffect(
    () => {
      fillTableOfContents(containerRef);
    }, []
  );

  // On resizing the page
  useEffect( () => {
    scroll();
  });


  return (

    <div 
      id="tableOfContentsStatic" 
      className='tableOfContents'
      ref={containerRef} 
      istablet={isTablet ? "true": "false"}
    />

  )
}

export default TableOfContentsStatic;