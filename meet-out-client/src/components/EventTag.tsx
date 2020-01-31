import React, {useEffect, useState} from 'react'
import { Link , Redirect} from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import {MeetForCalendar} from './Content'
import Moment from 'react-moment'
import { Decoded } from '../App'
import moment from 'moment'
import EditMeet from './EditMeet'
import { userInfo } from 'os'
import Delete from './Delete'

// pass the event into this and display the event info
interface EventTagProps {
    user: Decoded | null,
    meet: MeetForCalendar,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const EventTag: React.FC<EventTagProps> = props => {

    let [referRedirect, setReferRedirect] = useState(false)

    let startTime = moment(props.meet.start).format("hh:mm a")
    let endTime = moment(props.meet.end).format("hh:mm a")

    const handleMeet = () => {
        console.log('redirecting')
        //update the current meet
        props.updateMeet(props.meet)
        setReferRedirect(true)
    }

    if (referRedirect) {
        return (
            <Redirect to='/edit' />
        )
    }

    let deleteButton

    if (props.user && props.user._id === props.meet.creator) {
        deleteButton = <Delete meet={props.meet} updateMeet={props.updateMeet}/>
    } 

    return (
        <Container className="event-tag">
            <h4>{props.meet.activity.name}</h4>
            <p><Moment format="MM/DD/YYYY">
                {props.meet.date.toDateString()}
            </Moment> <small>({startTime} - {endTime})</small></p>
            
            <div className="text-truncate">
            <small>{props.meet.description}</small>
            </div>

            <br />
            <Button size="sm" color="info">More Info</Button>{' '}
            <Button size="sm" color="info">View</Button> {' '}
            <Button size="sm" onClick={handleMeet} color="info">Edit</Button>{' '}
            {deleteButton}

        </Container>
    )
}

export default EventTag