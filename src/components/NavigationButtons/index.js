import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { isMobileOnly, isFirefox, isAndroid } from 'react-device-detect';

// Styles
import './styles.css';

// Functions
import { scrollToTop, scrollToBottom } from '../../helpers';


function NavigationButtons({setKeyword, loading, nb, display, formFocus}) {


  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState(false);
  const [focus, setFocus] = useState(formFocus);
  const [scrollPos, setScrollPos] = useState(); // To save the scroll position for mobile as the window moves on opening the virtual keyboard


  const initial = useRef(true);
  const inputRef = useRef();
  const frameRef = useRef();
  const btnSearchRef = useRef();
  const btnTopRef = useRef();
  const btnBottomRef = useRef();
  const btnReverseRef = useRef();


  useEffect( () => {
    setFocus(formFocus);
  }, [formFocus]);


  useEffect(
    () => {

      if (initial.current === true) {
        initial.current = false;
        return;
      }

      if (isMobileOnly) {
        window.scrollTo(0,0);
      } else {
        scrollToTop();
      }

      const timer = setTimeout(
        () => {
            setKeyword(value);
        }, 500
      );

      return () => clearTimeout(timer);

    }, [value, setKeyword]
  );


  useEffect( () => {

    if (isMobileOnly) {
      const banner = document.getElementById('banner'),
            nail = document.getElementById('nail'),
            lightForm = document.getElementById('lightForm'),
            researchFrame = document.getElementById('researchFrame');

      banner.style.display = isMobileOnly && visible ? "none" : null;
      nail.style.display = isMobileOnly && visible ? "none" : null;
      lightForm.style.display = isMobileOnly && visible ? "none" : null;
      researchFrame.style.top = isMobileOnly && visible ? "88px" : null;

      window.scrollTo(0,0);
    }

    if (!isMobileOnly && visible === false && value !=='') {
      scrollToTop();
    }

  }, [visible]); /* eslint-disable-line react-hooks/exhaustive-deps */


  // Event handlers

  const toggle = () => {

    setValue('');
    setVisible(prev => !prev);

    if (!isMobileOnly && !visible) {
      inputRef.current.focus();
    }

  }

  // Here I choose to work directly with the DOM, because I tested the reverse() iterator on the results/state array and it was longer to render.

  const reverse = () => {
    document.getElementById('grid').style.display = 'none';
    window.innerWidth > 768 ? scrollToTop('auto') : window.scrollTo(0,0);
    const verses = document.getElementsByClassName('verse');
    let n;
    order ? n=verses.length : n=0;
    for (let i=verses.length-1; i>=0; i--) {
      verses[i].style.order = n;
      order ? n-- : n++;
    }
    setOrder(!order);
    document.getElementById('grid').style.display = 'grid';
  }


  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleBlur = () => {
    if (isMobileOnly && isFirefox) {
      setFocus(false);
    }
    if (isMobileOnly && !isAndroid) {
      const timeout = setTimeout(
        () => window.scrollTo(0, scrollPos),
        50 // add a delay so when the user clicks on a verse, the event handler of the click runs first
      );
      return () => clearTimeout(timeout);
    }
  }

  const handleFocus = event => {
    if (isMobileOnly && !isAndroid) {
      setScrollPos(window.scrollY);
    }
    event.target.setSelectionRange(0,value.length);
    if (isMobileOnly && isFirefox) {
      setFocus(true);
    }
  }


  return (
    <div 
      id="navigationButtons" 
      display={display === false ? 'none' : undefined}
      ismobileonly={isMobileOnly ? "true" : "false"}
    >

      <div 
        id="searchAmongResults" 
        className={visible ? 'visible' : undefined}
        ismobileonly={isMobileOnly ? "true" : "false"}
        ref={frameRef}
      >
        <p>Rechercher parmi les résultats</p>
        <div id="cross" onClick={toggle} />
        <input 
          type="text"
          placeholder="Référence ou mot-clef"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </div>

      <div 
        id='btnSearch'
        className={`icon button ${focus && 'hidden'} ${loading || (!nb && !value) ? 'disabled transparent' : undefined}`}
        onClick={!loading ? toggle : undefined}
        ref={btnSearchRef}
      />

      <div 
        id='btnTop'
        className={`icon button ${focus && 'hidden'} ${loading || !nb ? 'disabled transparent' : undefined}`}
        ref={btnTopRef}
        onClick={
          !loading
          ? window.innerWidth > 768 
            ? event => scrollToTop('smooth') 
            : event => window.scrollTo({top: 0, left: 0, behavior:'smooth'})
          : undefined
        } 
      />

      <div 
        id='btnBottom'
        ref={btnBottomRef}
        className={`icon button ${focus && 'hidden'} ${loading || !nb ? 'disabled transparent' : undefined}`}
        onClick={!loading ? event => scrollToBottom('smooth') : undefined}
      />
  
      <div 
        id='btnReverse'
        ref={btnReverseRef}
        className={`icon button ${focus && 'hidden'} ${loading || !nb ? 'disabled transparent' : undefined}`}
        onClick={!loading ? reverse : undefined}
      />

    </div>
  )

}

NavigationButtons.propTypes = {
  setKeyword: PropTypes.func, 
  loading: PropTypes.bool, 
  nb: PropTypes.bool,
  display: PropTypes.bool,
  formFocus: PropTypes.bool
}

export default NavigationButtons;