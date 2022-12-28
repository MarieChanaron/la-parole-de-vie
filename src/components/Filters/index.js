import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Style
import './styles.css';

// Component
import Button from '../Button';

// Helper functions
import { scrollToTop } from '../../helpers';


function Filters({setShowLeftPane, loading, total, setFilter, setNb}) {
  
    const [value, setValue] = useState('verse');

    const buttons = [
        {id: 'ot', name: 'Ancien Testament'},
        {id: 'nt', name: 'Nouveau Testament'},
        {id: 'verse', name: 'Tout afficher'}
    ]


    useEffect( () => {
        if (loading) {return}
        const nb = document.getElementsByClassName(value).length;
        nb === 0 ? setNb(false) : setNb(true);
    });


    useEffect( () => {
        setFilter(value);
        const grid = document.getElementById('grid');
        grid.classList = `${value}Grid`; 
        window.innerWidth > 768 ? scrollToTop('auto') : window.scrollTo(0,0);
        }, [value]
    );


    const handleClick = event => {
        setShowLeftPane('hide');
        setValue(event.target.id);
    }


    return (
        <div id="filters" className={` ${!total && 'invisible'} ${loading && 'transparent'}`} >
            <p>Filtres</p>

            {buttons.map( item => 
                <Button 
                    id={item.id}
                    key={item.id}
                    text={item.name}
                    handleClick={handleClick}
                    disabled={loading && true}
                    className={`${value === item.id ? 'selected' : ''} button filterButton`}               
                />
            )}
            
        </div>
    )

}

Filters.propTypes = {
    setShowLeftPane: PropTypes.func, 
    loading: PropTypes.bool, 
    total: PropTypes.number, 
    setFilter: PropTypes.func, 
    setNb: PropTypes.func
}

export default Filters;


// About document.getElementById('grid').className = value
// Not a React way of doing but for 3000 results it was too slow to pass props because it would have triggered a rerender.
// After some tests I choose to manipulate directly the DOM to make the app lighter. 
// Here I don't have to use JavaScript to make a new results array, but I only add a CSS class to the grid parent so the CSS will hide only some verses.
// I could pass the filter to the grid through props, but to do it I would have needed to use states, and states trigger rerenders (a render could be very long if 5000 results). 