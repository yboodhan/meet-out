import React from 'react'
import { Route } from 'react-router-dom'

//Components
import Signup from './Signup'
import Home from './Home'
import Profile from './Profile'



const Content: React.FC = () => {
    return (
        <div className="content-container">
            <Route exact path="/" component={Signup} /> {/* update to render methods with props */}
            <Route path="/profile" component={Profile} /> {/* update to render methods with props */}
            <Route path="/home" component={Home}/> {/* update to render methods with props */}
        </div>
    )
}

export default Content