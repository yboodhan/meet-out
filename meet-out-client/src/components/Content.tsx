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
import NewMeet from './NewMeet'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}


export interface MeetForCalendar {
    _id: number,
    title: string,
    creator: string,
    private: boolean,
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
        }
    }
}

interface getResults {
    meets: Meet[]
}


// const testMeets: MeetForCalendar[] = [{
//     _id: 29,
//     title: 'running',
//     date: new Date('January 17, 2020 07:00:00'),
//     start: new Date('January 17, 2020 7:00:00'),
//     end: new Date('January 17, 2020 9:00:00'),
//     description: 'describing my meet',
//     users: ['5e31ca382619e7073833bc32'],
//     activity: {
//         name: 'running',
//         locations: [{
//           name: 'Burke Gilman Trail',
//           address: '3901 Fremont Ave N',
//           city: 'Seattle',
//           state: 'WA',
//           zip: 98103,
//           lat: 47.6062,
//           long: 122.3321
//         }]
//       }
// }]


const Content: React.FC<ContentProps> = props => {

    // State variables
    let [allMeets , setAllMeets] = useState<MeetForCalendar[]>([])
    // let [allMeets , setAllMeets] = useState<MeetForCalendar[]>(testMeets)

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
                        creator: meet.creator,
                        private: meet.private,
                        title: meet.activity.name, 
                        date: new Date(meet.date.toString()),
                        start: new Date(meet.starttime.toString()),
                        end: new Date(meet.endtime.toString()),
                        description: meet.description,
                        users: meet.users,
                        activity: meet.activity
                        }
                    })
                    console.log('🌈🌈🌈🌈🌈', typeof allMeets[0].start)
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
            <Route path="/create" render={
                () => <NewMeet user={props.user} />
            }/>
        </div>
    )
}

export default Content