import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Decoded } from '../App'
import User from '../../../meet-out-server/src/models/user'
import Meet from '../../../meet-out-server/src/models/meet'


//Components
import Signup from './Signup'
import Userhome from './Userhome'
import Profile from './Profile'
import EditProfile from './EditProfile'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}


export interface MeetForCalendar {
    _id: number,
    title: string,
    date: Date,
    start: Date,
    end: Date,
    description: string,
    users: User[],
    activity: {
        name: string,
        locations: {
            name: string;
            address: string;
            city: string;
            state: string;
            zip: number;
            lat: number;
            long: number;
          }[]
    }
}

interface getResults {
    meets: Meet[]
}

const Content: React.FC<ContentProps> = props => {

    // State variables
    let [allMeets , setAllMeets] = useState<MeetForCalendar[]>([])

    useEffect(() => {
        // Fetch meets from get route
            fetch(`${process.env.REACT_APP_SERVER_URL}/meet`)
            .then(response => {
                console.log('In then code', response)
                response.json()
                .then((results: getResults) => {
                    console.log('🌈🌈', results, '👻👻', response)
                    let allMeets: MeetForCalendar[] = results.meets.map(meet => {
                        return { 
                        _id: meet._id,
                        title: meet.activity.name, 
                        date: meet.date,
                        start: meet.starttime,
                        end: meet.endtime,
                        description: meet.description,
                        users: meet.users,
                        activity: meet.activity
                        }
                    })
                    console.log('🌈🌈🌈🌈🌈', allMeets)
                    setAllMeets(allMeets)
                })
                .catch( (err: Error) => {
                    console.log('Error', err)
                })
            })
            .catch( (err: Error) => {
                console.log('Error', err)
            })
    }, [])


    return (
        <div className="content-container">
            <Route exact path="/" render={
                () => <Signup user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/profile/edit" render={
                () => <EditProfile user={props.user}/>
            }/>
            <Route exact path="/profile" render={
                () => <Profile user={props.user} />
            } />
            <Route path="/home" render={
                () => <Userhome allMeets={allMeets} />
            }/>
        </div>
    )
}

export default Content