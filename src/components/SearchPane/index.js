import React, { useState } from 'react';
import PropTypes from "prop-types";
import { isTablet } from 'react-device-detect';

// Styles
import './styles.css';

// Components
import Form from '../Form';
import Filters from '../Filters';
import ResultsUpdate from '../ResultsUpdate';


function SearchPane({showLeftPane, setShowLeftPane, resultsLength, total, loading, keyword, setNb}) {

  const [filter, setFilter] = useState();

  return (

    <div 
      id="searchPane" 
      show={showLeftPane}
      className={`${total && "scrollable"}`}
      istablet={isTablet ? "true" : "false"}
    >

        <Form />

        <ResultsUpdate 
          resultsLength={resultsLength}
          total={total}
          filter={filter}
          loading={loading}
          keyword={keyword}
        />

        <Filters
          setShowLeftPane={setShowLeftPane}
          loading={loading}
          total={total}
          setFilter={setFilter}
          setNb={setNb}
        />

    </div>

  )

}

SearchPane.propTypes = {
  showLeftPane: PropTypes.string,
  setShowLeftPane: PropTypes.func, 
  resultsLength: PropTypes.number, 
  total: PropTypes.number, 
  loading: PropTypes.bool, 
  keyword: PropTypes.string, 
  setNb: PropTypes.func
}

export default SearchPane;