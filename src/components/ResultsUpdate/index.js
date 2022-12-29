import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

// Styles
import './styles.css';

// Components
import Loader from '../Loader';


function ResultsUpdate({resultsLength, total, filter, loading, keyword}) {


    const [nb, setNb] = useState(total);


    useEffect(
        () => {
            setNb(total);
        }, [total]
    )


    useEffect( () => {

        switch (filter) {
            case 'ot':
                setNb(document.getElementsByClassName('ot').length);
                break;
            case 'nt':
                setNb(document.getElementsByClassName('nt').length);
                break;
            default:
                setNb(keyword ? resultsLength : total);
                break;
        }

    }, [filter, keyword, resultsLength, total]);
    

  return (

    <div id="resultsUpdate">

        {
            total ? 

            <div>
                <p> 
                    { !loading && nb>0 ? '~' : null }
                    {` ${nb>0 ? nb : ''} ${nb>0 ? 'résultat' : ''}${nb > 1 ? 's' : ''} `}
                    { !loading && nb>0 ? '~' : null }
                </p>
                { loading ? <div className='small'><Loader /></div> : null }
            </div>

            : <div> { loading ? <div className='small'><Loader /></div> : null } </div>

        }

    </div>

 )
}

ResultsUpdate.propTypes = {
    resultsLength: PropTypes.number, 
    total: PropTypes.number, 
    filter: PropTypes.string, 
    loading: PropTypes.bool, 
    keyword: PropTypes.string
}

export default ResultsUpdate;