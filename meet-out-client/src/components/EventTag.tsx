import React, { useState } from 'react'
import { Button, Container, Modal, ModalHeader } from 'reactstrap'
import { Redirect} from 'react-router-dom'
import {MeetForCalendar} from './Content'
import Moment from 'react-moment'
import { Decoded } from '../App'
import moment from 'moment'
import MeetModal from './MeetModal'



// import { DefaultMeetForCalendar } from './Calendar'

import Delete from './Delete'

// pass the event into this and display the event info
interface EventTagProps {
    user: Decoded | null,
    meet: MeetForCalendar,
    className?: string
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const EventTag: React.FC<EventTagProps> = props => {

    let [referRedirect, setReferRedirect] = useState(false)

    let startTime = moment(props.meet.start).format("hh:mm a")
    let endTime = moment(props.meet.end).format("hh:mm a")

    const {className} = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const showDetails = (meet: MeetForCalendar) => {
        props.updateMeet(props.meet)
        toggle()
    }


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
        
            <Button size="sm" color="info" onClick={meet => showDetails(props.meet)}>More Info</Button>{' '}
            <Button size="sm" onClick={handleMeet} color="info">Edit</Button>{' '}
            {deleteButton}

            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}><h1>{props.meet.title}</h1></ModalHeader>
                    <MeetModal user={props.user} currentMeet={props.meet} modal={modal} updateMeet={props.updateMeet} toggle={toggle} />
                </Modal>
            </div>
        </Container>
    )
}

export default EventTag