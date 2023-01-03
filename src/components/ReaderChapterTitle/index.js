import React from 'react';
import PropTypes from "prop-types";
// import { isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Helper functions
import { findNbOfChapters } from '../../helpers';


function ReaderChapterTitle({book, chapter, className}) {

  return (
    <div 
      id="readerChapterTitle" 
      className={className}
      // ismobileonly={isMobileOnly ? "true" : "false"}
    >
        <h2>
            <span>{book.name}</span>
            {
                chapter && findNbOfChapters(book.id) > 1 
                ? <span>, Chapitre {chapter}</span> 
                : null
            }
        </h2>
    </div>
  )

}


ReaderChapterTitle.propTypes = {
  book: PropTypes.object, 
  chapter: PropTypes.number
}

export default ReaderChapterTitle;