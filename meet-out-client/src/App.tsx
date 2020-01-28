// Import React
import React, { useState, useEffect } from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
// Import jwt decode
import jwtDecode from 'jwt-decode'
// Import CSS stylsheet
import './App.css'
// Import user type from user model
import User from '../../meet-out-server/src/models/user'
// Import components
import Content from './components/Content'
import Footer from './components/Footer'
import Nav from './components/Nav'

// Interface for decoded type
export interface Decoded extends User {
  exp: number
}

const App: React.FC = () => {

  // Creater user state and function to set state
  let [user, setUser] = React.useState<Decoded | null>(null)

  // Check for token on load
  useEffect(() => {
    decodeToken(null)
  }, [])

  // Function to update the user
  const updateUser = (newToken: string | null) => {
    if (newToken) {
      // Store this token
      localStorage.setItem('userToken', newToken)
      // Decode this token
      decodeToken(newToken)
    } else {
      // If no token, user is null
      setUser(null)
    }
  }

  // Function to decode the token
  const decodeToken = (existingToken: string | null) => {
    let token: string | null = existingToken || localStorage.getItem('userToken')

    // Token exists
    if (token) {
      // Decode token
      let decoded: Decoded = jwtDecode(token)

      // Expired or invalid token
      if (!decoded || (Date.now() > decoded.exp * 1000)) {
        setUser(null)
      } else {
        setUser(decoded)
      }
    } else {
      setUser(null)
    }
  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateUser={updateUser}/>
        <main>
          <Content user={user} updateUser={updateUser}/>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
