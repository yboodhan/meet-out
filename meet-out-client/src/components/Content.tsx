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
import Meet from '../../../meet-out-server/src/models/meet'
import Meet from '../../../meet-out-server/src/models/meet'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}


export interface MeetForCalendar {
    _id: number,
    creator: string,
    private: boolean,
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
          }
    }
}

interface MeetForCalendarNull {
    _id: null,
    creator: null,
    private: null,
    title: null,
    date: null,
    start: null,
    end: null,
    description: null,
    users: User[],
    activity: {
        name: null,
        locations: {
            name: null;
            address: null;
            city: null;
            state: null;
            zip: null;
            lat: null;
            long: null;
          }
    }
}

const MeetForCalendarNull = {
    _id: null,
    creator: null,
    private: null,
    title: null,
    date: null,
    start: null,
    end: null,
    description: null,
    users: User[],
    activity: {
        name: null,
        locations: {
            name: null;
            address: null;
            city: null;
            state: null;
            zip: null;
            lat: null;
            long: null;
          }
    }
}

interface getResults {
    meets: Meet[]
}


const Content: React.FC<ContentProps> = props => {

    // State variables
    let [allMeets , setAllMeets] = useState<MeetForCalendar[] | MeetForCalendarNull[]>([])
    // let [allMeets , setAllMeets] = useState<MeetForCalendar[]>(testMeets)

    let [myPrivateMeets, setMyPrivateMeets] = useState<MeetForCalendar[] | MeetForCalendarNull[]>([])
    let [myPublicMeets, setMyPublicMeets] = useState<MeetForCalendar[] | MeetForCalendarNull[]>([])
    let [attendingPublicMeets, setAttendingPublicMeets] = useState<MeetForCalendar[] | MeetForCalendarNull[]>([])
    let [notAttendingPublicMeets, setNotAttendingPublicMeets] = useState<MeetForCalendar[] | MeetForCalendarNull[]>([])
    

    useEffect(() => {
        // Fetch meets from get route
            fetch(`${process.env.REACT_APP_SERVER_URL}/meet`)
            .then(response => {
                console.log('In then code', response)
                response.json()
                .then((results: getResults) => {
                    console.log('🌈🌈', results, '👻👻', response)
                        //create allMeets, myPrivate, myPublic, attending & not attending meets categories
                        

                        if(results) {

                            let allMeets = results.meets.map(meet => {
                                return { 
                                _id: meet._id || null,
                                creator: meet.creator || null,
                                private: meet.private || null,
                                title: meet.activity.name || null, 
                                date: new Date(meet.date.toString()) || null,
                                start: new Date(meet.starttime.toString()) || null,
                                end: new Date(meet.endtime.toString()) || null,
                                description: meet.description || null,
                                users: meet.users || null,
                                activity: meet.activity || null
                                }
                            })
                    
                            let myPrivateMeets = allMeets.map(meet => {
                                let myPrivateMeet
                                if(meet.creator == props.user._id && meet.private) {
                                    myPrivateMeet = meet
                                } else {
                                    myPrivateMeet = MeetForCalendarNull
                                }
                                return myPrivateMeet
                            })

                            let myPublicMeets = allMeets.map(meet => {
                                let myPublicMeet = MeetForCalendarNull
                                if(meet.creator == props.user._id && !meet.private) {
                                    myPublicMeet = meet
                                }
                                return myPublicMeet
                            })

                            let attendingPublicMeets = allMeets.map(meet => {
                                let amAttending = false
                                let myAttending
                                if(meet.creator != props.user._id && !meet.private) {
                                    for(let i = 0; i < meet.users.length; i++) {
                                        if(meet.users[i] == props.user._id) {
                                            amAttending = true
                                            break
                                        }
                                    }
                                    if(amAttending) {
                                        myAttending = meet
                                    }
                                }
                                return myAttending
                            })
                    
                            let notAttendingPublicMeets = allMeets.map(meet => {
                                let amAttending = true
                                let myAttending
                                if(meet.creator != props.user._id && !meet.private) {
                                    for(let i = 0; i < meet.users.length; i++) {
                                        if(meet.users[i] == props.user._id) {
                                            amAttending = true
                                            break
                                        }
                                    }
                                    if(!amAttending) {
                                        myAttending = meet
                                    }
                                }
                                return myAttending
                            })
                    
    
                    //set state for each meet category variable
                    setAllMeets(allMeets)
                    setMyPrivateMeets(myPrivateMeets)
                    setMyPublicMeets(myPublicMeets)
                    setAttendingPublicMeets(attendingPublicMeets)
                    setNotAttendingPublicMeets(notAttendingPublicMeets)

                }
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
                () => <Userhome allMeets={allMeets} user={props.user} />
            }/>
            <Route path="/create" render={
                () => <NewMeet user={props.user} />
            }/>
        </div>
    )
}

export default Content


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
