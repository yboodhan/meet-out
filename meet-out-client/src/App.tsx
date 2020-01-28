// Import React
import React from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import Login from './components/Login'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Login />
      </Router>
    </div>
  );
}

export default App;
