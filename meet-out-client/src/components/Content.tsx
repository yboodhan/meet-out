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

interface getResults {
    meets: Meet[]
}


const Content: React.FC<ContentProps> = props => {

    // State variables
    let [allMeets , setAllMeets] = useState<MeetForCalendar[]>([])
    // let [allMeets , setAllMeets] = useState<MeetForCalendar[]>(testMeets)

    let [myPrivateMeets, setMyPrivateMeets] = useState<MeetForCalendar[]>([])
    let [myPublicMeets, setMyPublicMeets] = useState<MeetForCalendar[]>([])
    let [attendingPublicMeets, setAttendingPublicMeets] = useState<MeetForCalendar[]>([])
    let [notAttendingPublicMeets, setNotAttendingPublicMeets] = useState<MeetForCalendar[]>([])
    let [message, setMessage] = useState('')

    useEffect(() => {
        // If there is a user, fetch meets from get route
            if(props.user != null){
                fetch(`${process.env.REACT_APP_SERVER_URL}/meet`)
                .then(response => {
                    console.log('In then code', response)
                    response.json()
                    .then((results: getResults) => {
                        console.log('🌈🌈', results, '👻👻', response)

                            //create allMeets, myPrivate, myPublic, attending & not attending meets categories
                            if(results) {
                                let allMeets = results.meets.map<MeetForCalendar>(meet => {
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
                                
                                let myPrivateMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator == props.user._id && meet.private
                                )

                                let myPublicMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator == props.user._id && !meet.private 
                                )
                                
                                const amAttending = (meet: MeetForCalendar) => {
                                    if(props.user != null){
                                        for(let i = 0; i < meet.users.length; i++) {
                                            if(meet.users[i] == props.user._id) {
                                                return true
                                            }
                                        }
                                    return false
                                    }
                                }

                                let attendingPublicMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator != props.user._id && !meet.private && amAttending(meet)
                                )
                        
                                let notAttendingPublicMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator != props.user._id && !meet.private && !amAttending(meet)
                                )
                        
        
                            //set state for each meet category variable
                            setAllMeets(allMeets)
                            setMyPrivateMeets(myPrivateMeets)
                            setMyPublicMeets(myPublicMeets)
                            setAttendingPublicMeets(attendingPublicMeets)
                            setNotAttendingPublicMeets(notAttendingPublicMeets)

                        } else {
                        setMessage('No events scheduled')  
                        }
                    })
                    .catch( (err: Error) => {
                        console.log('Error', err)
                    })
                })
                .catch( (err: Error) => {
                    console.log('Error', err)
                })
            }
    }, [props.user])


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
                () => <Userhome 
                    user={props.user} 
                    myPrivateMeets={myPrivateMeets} 
                    myPublicMeets={myPublicMeets} 
                    attendingPublicMeets={attendingPublicMeets} 
                    notAttendingPublicMeets={notAttendingPublicMeets} 
             />
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
