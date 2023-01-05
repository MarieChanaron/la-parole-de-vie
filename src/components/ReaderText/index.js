import React, { useLayoutEffect, useEffect } from 'react';
import PropTypes from "prop-types";
import { isTablet, isMobileOnly, isMobile } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import VerseText from '../VerseText';

// Helper function
import { getUrlParam } from '../../helpers';



function ReaderText({text}) {

    const initial = React.useRef(true);

    const verseParam = Number(getUrlParam('verse'));
    const verseRef = React.useRef();


    const scrollIntoText = () => {
        let xScroll = isMobile || (window.innerWidth > 1487 && window.innerWidth <= 1850) ? 'center' : 'nearest';
        let yScroll = isMobile || window.innerWidth <= 768 ? 'center' : 'nearest'; 
        if (isMobile || (window.innerWidth <= 768 || window.innerHeight > 700)) {
            verseRef.current.scrollIntoView({block: yScroll, inline: xScroll});
        } else {
            window.scrollTo(0,0);
        }
    }


    useLayoutEffect(
        () => {
            if (verseParam) {
                if (verseRef.current && initial) {
                    scrollIntoText();
                    initial.current = false;
                }
            } else {
                window.scrollTo(0,0);
            }
        }
    );


    const reload = () => {
        window.location.reload();
    }


    useEffect( () => {
        if (isTablet) {
            window.addEventListener('orientationchange', reload);
            return () => window.removeEventListener('orientationchange', reload);
        }
        if (!isMobile) {
            window.addEventListener('resize', scrollIntoText);
            return () => window.removeEventListener('resize', scrollIntoText);
        }
    }, []); 


    return (
        <div 
            id="readerText" 
            istablet={isTablet ? "true" : "false"}
            ismobileonly={isMobileOnly ? "true" : "false"}
            ismobile={isMobile ? "true" : "false"}
        >

            {
                text.map(
                    (verse, index) => 
                        <div   
                            key={index} 
                            className={verse.verseNb === verseParam ? 'highlight' : null} 
                            ref={verse.verseNb === verseParam ? verseRef : null} 
                        >
                            <span className='nb'>
                                {verse.verseNb}
                            </span>

                            <span>&nbsp;</span>

                            <p className='content'>

                                <VerseText 
                                    text={verse.verseText} 
                                    selected={verse.verseNb === verseParam && "selected"}
                                />

                            </p>

                            {
                                verse.verseNb === text.length
                                ? <p id="divider">* * *</p>
                                : null
                            }

                        </div>

                )

            }

        </div>
    )
}

ReaderText.propTypes = {
    text: PropTypes.array
}

export default ReaderText;
