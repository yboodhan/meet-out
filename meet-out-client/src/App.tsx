// Import React
import React from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import Nav from './components/partials/Nav'
import Content from './components/Content'
import Footer from './components/partials/Footer'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Nav />
        <main>
          <Content />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
