import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Decoded, User, Meet } from '../App'
// import User from '../../../meet-out-server/src/models/user'
// import Meet from '../../../meet-out-server/src/models/meet'




//Components
import Signup from './Signup'
import Userhome from './Userhome'
import Profile from './Profile'
import EditProfile from './EditProfile'
import NewMeet from './NewMeet'
import EditMeet from './EditMeet'
import ShowMeet from './ShowMeet'
import MeetModalFooter from './MeetModalFooter'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

export interface MeetForCalendar {
    _id: string,
    title: string,
    creator: string,
    private: boolean,
    date: Date,
    start: Date,
    starttime?: Date,
    endtime?: Date,
    end: Date,
    description: string,
    users: User[],
    activity: {
        name: string,
        locations: {
            address: string;
            city: string;
            state: string;
            zip: number;
            lat: number;
            long: number;
        }
    },
    myPrivateMeet: boolean,
    myPublicMeet: boolean,
    attending: boolean
}

interface getResults {
    meets: Meet[]
}


const Content: React.FC<ContentProps> = props => {

    // State variables
    let [allMeets , setAllMeets] = useState<MeetForCalendar[]>([])
    let [newOrUpdatedMeet, setNewOrUpdatedMeet] = useState<MeetForCalendar | null>(null)
    let [myPrivateMeets, setMyPrivateMeets] = useState<MeetForCalendar[]>([])
    let [myPublicMeets, setMyPublicMeets] = useState<MeetForCalendar[]>([])
    let [attendingPublicMeets, setAttendingPublicMeets] = useState<MeetForCalendar[]>([])
    let [notAttendingPublicMeets, setNotAttendingPublicMeets] = useState<MeetForCalendar[]>([])
    let [message, setMessage] = useState('')
    let [currentMeet, setCurrentMeet] = useState<MeetForCalendar | null>(null)


    useEffect(() => {
        // If there is a user, fetch meets from get route
            if(props.user != null){
                let token = localStorage.getItem('userToken')
                fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${props.user._id ? props.user._id : null}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    response.json()
                    .then((results: getResults) => {
                            //create allMeets, myPrivate, myPublic, attending & not attending meets categories
                            if(results) {
                                const amAttending = (meet: Meet) => {

//                                     for(let i = 0; i < meet.users.length; i++) {
//                                         if(meet.users[i]._id === props.user?._id) {
//                                             return true

                                    if(props.user != null){
                                        for(let i = 0; i < meet.users.length; i++) {
                                            if(meet.users[i]._id === props.user._id) {
                                                return true
                                            }
                                        }
                                    }
                                    return false
                                }

                                let allMeets = results.meets.map<MeetForCalendar>( meet => {
                                    let dateString = meet.date.toString().slice(0,10)

                                    return { 
                                    _id: meet._id,
                                    creator: meet.creator,
                                    private: meet.private,
                                    title: meet.activity.name, 
                                    date: new Date(dateString),
                                    start: new Date(dateString + ' ' + meet.starttime),
                                    end: new Date(dateString + ' ' + meet.endtime),
                                    description: meet.description,
                                    users: meet.users,
                                    activity: meet.activity,
                                    myPrivateMeet: (props.user != null && meet.creator === props.user._id && meet.private) ? true : false,
                                    myPublicMeet: (props.user != null && meet.creator === props.user._id && !meet.private) ? true : false,
                                    attending: amAttending(meet) ? true : false
                                    }
                                })
                                console.log(allMeets)
                                
                                let myPrivateMeets = allMeets.filter(meet => 
                                    meet.myPrivateMeet
                                )

                                let myPublicMeets = allMeets.filter(meet => 
                                    meet.myPublicMeet
                                )
                                
                                
                                let attendingPublicMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator !== props.user._id && !meet.private && meet.attending
                                )
                        
                                let notAttendingPublicMeets = allMeets.filter(meet => 
                                    props.user != null && meet.creator !== props.user._id && !meet.private && !meet.attending
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
                    .catch((err: Error) => {
                        console.log('Error', err)
                    })
                })
                .catch((err: Error) => {
                    console.log('Error', err)
                })
            }
    }, [props.user, newOrUpdatedMeet])

    const updateMeet = (currentMeet: MeetForCalendar | null) => {
        //update the current meet being edited
        console.log('updating meet to', currentMeet)
        setCurrentMeet(currentMeet)
        setNewOrUpdatedMeet(currentMeet)
    }


    return (
        <div className="content-container">
            <Route exact path="/" render={
                () => <Signup user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/profile/edit" render={
                () => <EditProfile user={props.user} updateUser={props.updateUser}/>
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
                    updateMeet={updateMeet}
                    currentMeet={currentMeet}
            />
            }/>
            <Route path="/create" render={
                () => <NewMeet user={props.user} updateMeet={updateMeet}/>
            }/>
            <Route path="/edit" render={
                () => <EditMeet currentMeet={currentMeet} updateMeet={updateMeet} user={props.user} />
            }/>
            <Route path="/show" render={
                () => <ShowMeet currentMeet={currentMeet} user={props.user} />
            }/>

        </div>
    )
}

export default Content