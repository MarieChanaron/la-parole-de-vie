import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { isMobileOnly } from "react-device-detect";

// Styles
import "./styles.css";

// Data
import { sections } from "../../data/sections";

// Helper functions
import { 
  getUrlParam, 
  redirectToReadUrl, 
  findNbOfChapters, 
  getBook, 
  getChapter, 
  findBookId,
  checkChapter,
  checkVerse
} from "../../helpers";
import { 
  addTranslationOptions, 
  fillBookSelectInput 
} from "../../helpers/formFunctions";


function ReaderForm({showForm, showTable, boxshadow}) {

  // Retrieve book and chapter from the URL
  const book = getBook();
  const chapter = getChapter();
  const translation = getUrlParam('translation');
  const verse = getUrlParam('verse');


  // Save form values
  const refBook = React.createRef();
  const refChapter = React.createRef();
  const refTranslation = React.createRef();
  const refVerse = React.createRef();


  // Event handlers

  const handleSubmit = event => {
    event.preventDefault();
    const chapterRequest = refChapter.current.value;
    const bookShortname = refBook.current.value;
    const referenceRequest = chapterRequest ? `${bookShortname} ${chapterRequest}` : bookShortname;
    const verseRequest = chapterRequest ? refVerse.current.value : null
    redirectToReadUrl(
      refTranslation.current.value,
      referenceRequest,
      verseRequest
    );
  }

  // Reset values on click

  const resetChapter = () => {
    refChapter.current.value = null;
    refVerse.current.value = null;
  }

  const resetVerse = () => {
    refVerse.current.value = null;
  }

  // Data validation (on leaving focus = onBlur)

  const checkChapterValidity = () => {
    if (checkChapter(refChapter.current.value, refBook.current.value) === false) {
      refChapter.current.value = null;
    }
  }

  const checkVerseValidity = () => {
    if (checkVerse(refVerse.current.value) === false) {
      refVerse.current.value = null;
    }
  }


  // Fill the chapter list at first render

  const addChapters = id => {
    const total = findNbOfChapters(id);
    let array = [];
    for (let n = 1; n <= total; n++) {
      array.push(<option key={n} value={n}> Chapitre {n} </option>);
    }
    return <> {array} </>;
  }

  
  // Fill the chapter list after choosing another book in the list

  const resetChaptersList = () => {
    // Reset the chapters and verses input
    refVerse.current.value = null;
    refChapter.current.value = null;
    const selectChapter = document.querySelector('datalist#chapters');
    const id = findBookId(refBook.current.value);
    selectChapter.innerHTML = "<option value='1'> Chapitre 1 </option>";
    // Add other chapters to the select input
    const total = findNbOfChapters(id);
    for (let n = 2; n <= total; n++) {
      const option = document.createElement('option');
      option.setAttribute('value', n);
      option.innerText = `Chapitre ${n}`;
      selectChapter.appendChild(option);
    }
  }


  // Select values in the form at first render

  useEffect(
    () => {

        // Add the books to the select input
        fillBookSelectInput(
          sections,
          document.querySelector('select#book'),
          book.shortname
        );

        // Set values from Url
        refTranslation.current.value = translation;
        refChapter.current.value = chapter;
        refVerse.current.value = verse;

    }, [book.shortname, chapter, refChapter, refTranslation, refVerse, translation, verse]
  );

  return (

    <form 
      id="readerForm" 
      onSubmit={handleSubmit} 
      show={showForm ? 'show' : null}
      boxshadow={boxshadow}
      tabledisplayed={showTable ? 'true' : undefined}
      ismobileonly={isMobileOnly ? "true" : "false"}
    >

      <label htmlFor="translation">Traduction</label>
      <select 
        name="translation" 
        id="translation" 
        ref={refTranslation}
      >
        { addTranslationOptions() }
      </select>

      <p className="separator">|</p>

      <label htmlFor="book">Livre</label>
      <select 
        name="book" 
        id="book"
        className="bookList" 
        ref={refBook} 
        onChange={resetChaptersList}
      >
        { /* Options added in the useEffect, with JavaScript functions, 
        because it's not possible to add an optgroup with JSX syntax, to change the value of refBook, or to iterate through a select list containing an optgroup */ }
      </select>
        
      <label htmlFor="reference">Chapitre & Verset (facultatifs)</label>
      <div className="reference">
        <input
          placeholder="Chap."
          list="chapters"
          id="chapter"
          name="chapter"
          ref={refChapter}
          onClick={resetChapter}
          onBlur={checkChapterValidity} />
        <datalist id="chapters">
          { book ? addChapters(book.id) : null }
        </datalist>
        <p className="colon">:</p>
        
        <input
          placeholder="Verset"
          list="verses"
          id="verse"
          className="verseInput"
          name="verse"
          ref={refVerse}
          onClick={resetVerse}
          onBlur={checkVerseValidity}
        />
        <datalist className="versesList" />
      </div>

      <input type="submit" value="" />
      <input className="button" type="submit" value="Valider" />

    </form>

  );
}

ReaderForm.propTypes = {
  showForm: PropTypes.bool, 
  showTable: PropTypes.bool, 
  boxshadow: PropTypes.string
}

export default ReaderForm;