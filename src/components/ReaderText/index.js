import React, { useState, useEffect, useLayoutEffect } from 'react';
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
    const [textHeight, setTextHeight] = useState(undefined);

    const verseParam = Number(getUrlParam('verse'));
    const verseRef = React.useRef();


    useLayoutEffect(
        () => {
            if (!verseParam) {
                window.scrollTo(0,0);
            } else {
                if (verseRef.current && initial) {
                    if (window.innerHeight > 700) {
                        verseRef.current.scrollIntoView({block: 'center', inline: 'nearest'});
                    }
                    initial.current = false;
                }
            }
        }
    );


    useEffect( () => {
        if (isTablet) {
            const height = window.innerHeight;
            if (height <= 992) {
                setTextHeight(height - 294);
            } else {
                setTextHeight(height - 310);
            }
        }
    }, []);


    return (
        <div 
            id="readerText" 
            style={textHeight ? {height: textHeight} : null}
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

                        </div>
                )

            }

            {
                text.length > 0
                ? <p id="divider">* * *</p>
                : null
            }

        </div>
    )
}

ReaderText.propTypes = {
    text: PropTypes.array
}

export default ReaderText;
