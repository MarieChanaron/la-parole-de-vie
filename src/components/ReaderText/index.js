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


    useLayoutEffect(
        () => {
            if (!verseParam) {
                window.scrollTo(0,0);
            } else {
                if (verseRef.current && initial) {
                    if (isMobile || window.innerHeight > 700) {
                        verseRef.current.scrollIntoView({block: 'center', inline: 'nearest'});
                    }
                    initial.current = false;
                }
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

                            <span>
                                &nbsp;
                            </span>

                            <p className='content'>

                                <span className='bracket'>
                                    { verse.verseNb === verseParam ? '[' : null }
                                </span>

                                <span>
                                    { verse.verseNb === verseParam ? ' ' : null }
                                </span>

                                <VerseText text={verse.verseText} />

                                <span>
                                    { verse.verseNb === verseParam ? ' ' : null }
                                </span>

                                <span className='bracket'>
                                    { verse.verseNb === verseParam ? ']' : null }
                                </span>

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
