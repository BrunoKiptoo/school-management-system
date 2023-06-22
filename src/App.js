import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';

function App() {
return (
    <Router>
          <div>
              <Routes>
                    <Route path="/" exact element={Homepage} />
                    {/* Add more routes for other components */}
            </Routes>
          </div>
    </Router>
);
}

export default App;