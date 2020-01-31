import React, {useState} from 'react'
import { Button } from 'reactstrap'
import {MeetForCalendar} from './Content'
import { Decoded } from '../App'

interface JoinMeetButtonProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const JoinMeetButton: React.FC<JoinMeetButtonProps> = props => {
    
    // let [message, setMessage] = useState('')    
    // let [referRedirect, setReferRedirect] = useState(false)

    const handleJoin = () => {
        if(props.currentMeet && props.user) {

        //convert users array to only the user ids
        let attendingUserIds = props.currentMeet.users.map(user => {
            return user._id
        })
        //push current user id onto user ids array
        attendingUserIds.push(props.user._id)

        // set data to send
        let data: object = {
            users: attendingUserIds,
            activityName: props.currentMeet.activity.name,
            description: props.currentMeet.description,
            activityAddress: props.currentMeet.activity.locations.address,
            city: props.currentMeet.activity.locations.city,
            state: props.currentMeet.activity.locations.state,
            zip: props.currentMeet.activity.locations.zip,
            date: props.currentMeet.date,
            starttime: props.currentMeet.start,
            endtime: props.currentMeet.end,
            creator: props.currentMeet.creator,
            privateMeet: props.currentMeet.private
        }

        console.log('🌈🌈🌈', data)
      
         //post to database put route
         let token = localStorage.getItem('userToken')
         fetch(`${process.env.REACT_APP_SERVER_URL}/meet`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                props.updateMeet(result)
                console.log('Response ok 🥳🥳🥳🥳🥳🥳', result)
                // setReferRedirect(true)
            } else {
                // Error
                console.log(response.status)
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
        <div>
            <Button onClick={handleJoin}>Join Meet</Button>
        </div>
    )
}

export default JoinMeetButton