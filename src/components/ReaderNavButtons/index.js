import React from 'react';
import { Tooltip } from '@mui/material';
import PropTypes from "prop-types";
import { isMobileOnly } from 'react-device-detect';

// Styles
import './styles.css';

// Icons
import next from '../../images/icons/next-chapter.svg';
import previous from '../../images/icons/previous-chapter.svg';

// Functions
import { 
    findNbOfChapters, 
    findBookShortname, 
    redirectToReadUrl,
    getUrlParam 
} from '../../helpers';


function ReaderNavButtons({book, chapter}) {


    const toNextChapter = () => {
  
        if (chapter < findNbOfChapters(book.id)) {
            redirectToReadUrl(
                getUrlParam('translation'),
                `${findBookShortname(book.id)} ${chapter + 1}`
            );
        } 
        
        else {
            redirectToReadUrl(
                getUrlParam('translation'), 
                `${findBookShortname(book.id + 1)} 1`
            );
        }
        
    }

    const toPreviousChapter = () => {

        if (chapter > 1) {
            redirectToReadUrl(
                getUrlParam('translation'),
                `${findBookShortname(book.id)} ${chapter - 1}`
            );
        } 
        
        else {
            redirectToReadUrl(
                getUrlParam('translation'),
                `${findBookShortname(book.id - 1)} ${findNbOfChapters(book.id - 1)}`
            );
        }
    }


    return (
        <div 
            id="readerNavBtns"
            ismobileonly={isMobileOnly ? "true" : "false"}
        >

            <hr/>
            
            <div>
                <div>
                    {
                        !(book.id === 1 && chapter === 1)
                        ?
                        <Tooltip title="Chapitre précédent" placement='left'>
                            <img
                                src={previous}
                                alt="précédent"
                                id="previous"
                                className="navBtn"
                                onClick={toPreviousChapter}
                            />
                        </Tooltip>
                        :
                        <img
                            src={previous}
                            alt=""
                            id="previous"
                            className="desactivated"
                        />
                    }
                    {
                        !(book.id === 66 && chapter === 22)
                        ?
                        <Tooltip title="Chapitre suivant" placement='right'>
                            <img
                                src={next}
                                alt="suivant"
                                id="next"
                                className="navBtn"
                                onClick={toNextChapter}
                            />
                        </Tooltip>
                        :
                        <img
                            src={next}
                            alt=""
                            id="next"
                            className="desactivated"
                        />
                    }
                </div>
            </div>
            
            
        </div>
    )
}

ReaderNavButtons.propTypes = {
    book: PropTypes.object, 
    chapter: PropTypes.number
}

export default ReaderNavButtons;
