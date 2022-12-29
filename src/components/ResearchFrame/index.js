import React, { useState, useEffect, useLayoutEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

// Styles 
import './styles.css';

// Components
import SearchPane from '../SearchPane';
import ResultPane from '../ResultPane';
import NavigationButtons from '../NavigationButtons';
import LightForm from '../LightForm';
import Veil from '../Veil';
import Nail from '../Nail';

// Hooks
import useFetchVerses from "../../hooks/useFetchVerses";

// Helpers
import { disableScroll, enableScroll } from '../../helpers';


function ResearchFrame() {

  const {state, total, loading, error} = useFetchVerses();

  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [nb, setNb] = useState(true);
  const [showLeftPane, setShowLeftPane] = useState('hide');
  const [formFocus, setFormFocus]= useState(false);


  useLayoutEffect( () => {
    if (isMobile) {
      showLeftPane === 'show' ? disableScroll() : enableScroll();
    }
  }, [showLeftPane])
  

  // Filter the results (only if there is a filtering keyword)
  useEffect( () => {
    if (!keyword) {return;}
    setResults([]);
    state.forEach( item => {
      const text = `${item.text} ${item.book.name} ${item.ref.chapterNb}:${item.ref.verseNb}`.toLowerCase();
      if (text.includes(keyword.toLowerCase())) {
        setResults( prev => [...prev, item] );
      }
    })
    }, [keyword, state]
  );


  const handleClick = () => {
    setShowLeftPane('hide');
  }
  

  return (

    <div 
      id="researchFrame" 
      istablet={isTablet ? "true" : "false"}
    >

      <Nail 
        showLeftPane={showLeftPane}
        setShowLeftPane={setShowLeftPane}
      />

      <LightForm 
        boxShadow={ showLeftPane==='show' ? false : true } 
        setFormFocus={setFormFocus}
      />

      <SearchPane
        showLeftPane={showLeftPane}
        setShowLeftPane={setShowLeftPane}
        resultsLength={keyword ? results.length : 0}
        total={!error ? total : 0}
        loading={loading}
        setNb={setNb}
        keyword={keyword}
      />

      <Veil 
        display={showLeftPane === 'show' ? 'block' : undefined} 
        handleClick={handleClick} 
      />

      <ResultPane
        results={!error ? (keyword ? results : state) : []}
        error={error}
        loading={loading}
        nb={!error ? nb : true}
      />

      {
        total && !error ?
        <NavigationButtons 
          formFocus={formFocus}
          setKeyword={setKeyword}
          loading={loading}
          nb={nb}
          display={showLeftPane==='hide' ? true : false}
        /> 
        : null
      }
      
    </div>

  )
}

export default ResearchFrame;