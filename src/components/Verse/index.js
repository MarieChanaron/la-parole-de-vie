import React from "react";
import PropTypes from "prop-types";

// Styles
import "./styles.css";

// Components
import VerseText from "../VerseText";

// Function
import { findBookShortname, redirectToReadUrl, getUrlParam } from "../../helpers";


function Verse(props) {

  const id = props.id; // The id serves to identify the verse div in an anchor link. The id is equal to the key nb.
  const {text, ref, book} = props.content;
  const testament = props.testament;

  
  // Actions to execute when clicking on any verse div
  const handleClick = () => {
    redirectToReadUrl(
      getUrlParam('translation'), 
      `${findBookShortname(book.id)} ${ref.chapterNb}`, 
      ref.verseNb
    );
  }


  return (
    <div id={id} className={`verse ${testament}`} onClick={handleClick}>

      <div className="text">
        <p><VerseText text={text} /></p>
      </div>

      <p id="reference">
        <span className='bookName'>{book.name}&nbsp;</span>
        <span>{ref.chapterNb}</span><span>:</span><span>{ref.verseNb}</span>
      </p>

    </div>
  );
}

Verse.propTypes = {
  content: PropTypes.object,
  id: PropTypes.string,
  testament: PropTypes.string
}

export default Verse;