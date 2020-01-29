import React from 'react'
import { Route } from 'react-router-dom'

//Components
import Signup from './Signup'
import Userhome from './Userhome'
import Profile from './Profile'


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
        </div>
    )
}

export default Content