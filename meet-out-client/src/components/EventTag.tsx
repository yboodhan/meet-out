import React, { useState } from 'react'
import { Button, Container, Modal, ModalHeader } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import {MeetForCalendar} from './Content'
import Moment from 'react-moment'
import { Decoded } from '../App'
import moment from 'moment'
import MeetModal from './MeetModal'
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
    let editButton

    if (props.user && props.user._id === props.meet.creator) {
        deleteButton = <Delete meet={props.meet} updateMeet={props.updateMeet}/>
        editButton = <Button size="sm" onClick={handleMeet} className="blue-outline-btn" color="primary">Edit</Button>
    }

    

    return (
        <Container className="event-tag">
            <h4><Link to='/show' className="dark-blue-text" onClick={ () => props.updateMeet(props.meet)}>{props.meet.activity.name}</Link></h4>
            <p><Moment format="MM/DD/YYYY">
                {props.meet.date.toDateString()}
            </Moment> <small>({startTime} - {endTime})</small></p>
            
            <div className="text-truncate">
            <small className="text-truncate">{props.meet.description}</small>
            </div>

            <br />
        
            <Button size="sm" className='blue-outline-btn' color="primary" onClick={meet => showDetails(props.meet)}>More Info</Button>{' '}
            {editButton}{' '}
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