import React from 'react';
// import { isTablet, isMobileSafari, isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import TableOfContentsStatic from '../TableOfContentsStatic';
import ReaderNavButtons from '../ReaderNavButtons';
import ReaderChapterTitle from '../ReaderChapterTitle';
import ReaderText from '../ReaderText';
import Loader from '../Loader';
import Error from '../Error';
import Band from '../Band';

// Hooks
import useFetchReference from '../../hooks/useFetchReference';


function Reader() {

  const {loading, error, book, chapter, text} = useFetchReference(); 

  return (

    <div 
      id="reader" 
      istablet="true"
      // istablet={isTablet ? "true": "false"}
      // ismobilesafari={isMobileSafari ? "true" : "false"}
      // ismobileonly={isMobileOnly ? "true" : "false"}
      // style={isTablet ? {height: window.innerHeight - 80} : null}
      style={{height: window.innerHeight - 80}}
    >

      <TableOfContentsStatic />

      <div 
        className="right" 
      >

        <Band />

        <div id="readerLoaderWrapper"><Loader /></div>

        {
          loading
          ? <div id="readerLoaderWrapper"><Loader /></div>
          : null
        }

        { 
          error ? 
          <div id="readerErrorContainer">
            <Error error={error} />
          </div> 
          : null 
        }

        <ReaderChapterTitle 
          book={book}
          chapter={chapter}
        />

        <ReaderText 
          text={text}
        />

        { 
          !loading && !error ?  
          <ReaderNavButtons 
            book={book} 
            chapter={chapter} 
          />
          : null
        }
      
      </div>

    </div>

  )
}

export default Reader;