import React from 'react'
import { Route } from 'react-router-dom'
import { Decoded } from '../App'

//Components
import Signup from './Signup'
import Userhome from './Userhome'
import Profile from './Profile'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const myEventList = [
    {
      id: 0,
      title: 'TEST EVENT',
      start: new Date(2020, 0, 28, 10),
      end: new Date(2020, 0, 28, 11)
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2020, 0, 9),
      end: new Date(2020, 0, 12)
    }]



const Content: React.FC = () => {


    return (
        <div className="content-container">
            <Route exact path="/" component={Signup} /> {/* update to render methods with props */}
            <Route path="/profile" component={Profile} /> {/* update to render methods with props */}
            <Route path="/home" render={
                () => <Userhome myEventList={myEventList} />
            }/>
        
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