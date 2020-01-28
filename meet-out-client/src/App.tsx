// Import React
import React from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
// Import CSS stylsheet
import './App.css'
// Import components
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Header />
        <main>
          <Content />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
