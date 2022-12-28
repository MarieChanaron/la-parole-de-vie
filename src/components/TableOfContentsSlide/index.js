import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { isTablet } from 'react-device-detect';

// Styles
import './styles.css';
import '../TableOfContentsStatic/globalstyles.css';

// Data
import { books } from '../../data/books';

// Helper functions
import { getBook } from '../../helpers';
import { fillTableOfContents } from '../../helpers/fillTableOfContents';



function TableOfContentsSlide({showTable, showForm}) {

  const containerRef = useRef();


  // The function below has the same role as scrollIntoView.
  // But this function works for elements having position fixed (for medium / small screen)
  const scrollIntoTable = (bookIndex, total) => {
    const toc = containerRef.current,
          scrollTopValue = toc.scrollHeight - toc.offsetHeight,
          val = scrollTopValue / (total-1) * bookIndex;
          // console.log("scrollheight: ", toc.scrollHeight);
          // console.log("offsetHeight: ", toc.offsetHeight);
          // console.log("scrolltop: ", toc.scrollTop);
          // console.log("scrollTopValue: ", scrollTopValue);
    toc.scrollTop = val;
  }

  const scroll = () => {
    const bookId = getBook().id;
    scrollIntoTable(bookId-1, books.length);
  }


  // On first loading
  useEffect(
    () => {
      fillTableOfContents(containerRef);
      scroll();
    }, []
  );

  // Scroll on resizing the page
  useEffect( () => {
    scroll();
  }, [window.innerWidth, window.innerHeight]);

  // Scroll on opening the table of contents
  useEffect( () => {
    if (showTable === true) {
      scroll();
    }
  }, [showTable]);


  return (

    <div 
      id="tableOfContentsSlide" 
      className='tableOfContents'
      ref={containerRef} 
      show={showTable ? 'show' : null} 
      formdisplayed={showForm ? 'true' : undefined}
      istablet={isTablet ? "true": "false"}
    />

  )
}

TableOfContentsSlide.propTypes = {
  showTable: PropTypes.bool, 
  showForm: PropTypes.bool,
}

export default TableOfContentsSlide;