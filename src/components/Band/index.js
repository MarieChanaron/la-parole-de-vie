import React, { useState, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import TableOfContentIcon from '../TableOfContentIcon';
import ManageSearchIcon from '../ManageSearchIcon';
import ReaderFormLight from '../ReaderFormLight';
import ReaderForm from '../ReaderForm';
import TableOfContentsSlide from '../TableOfContentsSlide';
import Veil from '../Veil';

// Helpers
import { disableScroll, enableScroll } from '../../helpers';


function Band() {

    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);


    useEffect( () => {
        if (isMobile) {
            showTable || showForm ? disableScroll() : enableScroll();
        }
    }, [showTable, showForm]);


    const handleClick = () => {
        setShowTable(false);
        setShowForm(false);
    }

    return (
        <div 
            id="band" 
            istablet={isTablet ? "true" : "false"}
        >

            <TableOfContentIcon
                showTable={showTable}
                setShowTable={setShowTable}
            />

            <ManageSearchIcon
                showForm={showForm}
                setShowForm={setShowForm}
            />
            
            <Veil 
                displayTable={showTable ? 'yes' : undefined}
                displayForm={showForm ? 'yes' : undefined}
                handleClick={handleClick} 
            />

            <ReaderForm 
                showForm={showForm}
                showTable={showTable}
                boxshadow={showTable || showForm ? 'none' : null}
            />

            <ReaderFormLight
                boxshadow={showTable || showForm ? 'none' : null}
            />

            <TableOfContentsSlide 
                showTable={showTable} 
                showForm={showForm} 
            />
            

        </div>
    )
}

export default Band;
