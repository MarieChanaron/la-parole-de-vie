import React from 'react';
import { isMobileSafari, isTablet } from 'react-device-detect';

// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from 'react-router-dom';


// Pages
import HomeSearchPage from './pages/HomeSearchPage';
import ResearchPage from './pages/ResearchPage/index.js';
import BibleReaderPage from './pages/BibleReaderPage';

// Styles
import './styles.css';


function App() {

  return (
    <div 
      id="app" 
      ismobilesafari={isMobileSafari ? "true" : "false"}
      istablet={isTablet ? "true" : "false"}
    >
      <Router>
        <Routes>
          <Route path='/' exact element={<HomeSearchPage />} />
          <Route path='/search' element={<ResearchPage />} />
          <Route path='/read' element={<BibleReaderPage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;