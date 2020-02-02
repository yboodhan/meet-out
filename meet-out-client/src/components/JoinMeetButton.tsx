import React, {useState} from 'react'
import { Button } from 'reactstrap'
import {MeetForCalendar} from './Content'
import { Decoded } from '../App'
import { Redirect } from 'react-router-dom'

interface JoinMeetButtonProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null,
    updateMeet: (currentMeet: MeetForCalendar | null) => void,
    toggle?: () => void
}

const JoinMeetButton: React.FC<JoinMeetButtonProps> = props => {
    
    // let [message, setMessage] = useState('')    
    let [referRedirect, setReferRedirect] = useState(false)

    const handleJoin = () => {

        if(props.currentMeet && props.user) {

        //convert users array to only the user ids
        let attendingUserIds = props.currentMeet.users.map(user => {
            return user._id
        })
        //push current user id onto user ids array
        attendingUserIds.push(props.user._id)

        // set data to send
        let data = {
            id: props.currentMeet ? props.currentMeet._id : null,
            creator: props.currentMeet.creator,
            private: props.currentMeet.private,
            date: new Date(props.currentMeet.date),
            starttime: props.currentMeet.start.toTimeString(),
            endtime: props.currentMeet.end.toTimeString(),
            description: props.currentMeet.description,
            users: attendingUserIds,
            activity: props.currentMeet.activity
        }
      
         //post to database put route
        //  let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                props.updateMeet({
                    _id: result._id,
                    title: result.activity.name,
                    creator: result.creator,
                    private: result.private,
                    date: new Date(result.date),
                    start: result.starttime,
                    end: result.endtime,
                    description: result.description,
                    users: result.users,
                    activity: result.activity,
                    myPrivateMeet: false,
                    myPublicMeet: false,
                    attending: true
                    })
       
                if(props.toggle) {
                    props.toggle()
                } else {
                    window.location.reload()
                }
                return 
            } else {
                // Error
                return <Redirect to = "/" />
                // setMessage(`${response.status} ${response.statusText}: ${result.message}`)
            }

            })
            .catch( (err: Error) => console.log(err))
        })
        .catch( (err: Error) => {
            console.log('Error', err)
            // setMessage(`Error: ${err.toString()}`)
        })

        } 
        return (
            <p>Error! No meet selected</p>
        )
    }
    
    return (
            <Button color="success" size="sm" onClick={handleJoin}>Join Meet</Button>
    )
}

export default JoinMeetButton