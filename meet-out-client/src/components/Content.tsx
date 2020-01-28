import React from 'react'
import { Route } from 'react-router-dom'
import { Decoded } from '../App'

//Components
import Signup from './Signup'
import Home from './Home'
import Profile from './Profile'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Content: React.FC<ContentProps> = props => {
    return (
        <div className="content-container">
            <Route exact path="/" render={
                () => <Signup user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/profile" render={
                () => <Profile user={props.user} />
            } />
            <Route path="/home" component={Home}/> {/* TODO: update to render methods with props */}
        </div>
    )
}

export default Content