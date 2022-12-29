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
  const toc = containerRef.current;
    // scrollHeight = toc.scrollHeight,
    // offsetHeight = toc.offsetHeight,
    // pos = bookIndex / total * scrollHeight,
    // posRelative = pos / scrollHeight,
    // scrolltop = posRelative * offsetHeight - 0.5 * (offsetHeight ** 2) / scrollHeight; 
  const pos = bookIndex / total;
  const scrollbarThumb = (toc.offsetHeight ** 2) / toc.scrollHeight;
  const space = toc.offsetHeight - scrollbarThumb;
  const val = pos * space;
  toc.scrollTop = val;
  }


  // On first loading
  useEffect(
    () => {
      fillTableOfContents(containerRef);
    }, []
  );


  // Scroll on first loading and on opening the table of contents
  useEffect( () => {
    if (showTable === true) {
      const bookId = getBook().id;
      scrollIntoTable(bookId-1, books.length);
    }
  });


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