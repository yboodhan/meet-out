// Import React
import React from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
