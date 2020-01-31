import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {MeetForCalendar} from './Content'
import Moment from 'react-moment'
import moment from 'moment'
import { Decoded } from '../App';
import EditMeet from './EditMeet'
import MeetModalBody from './MeetModalBody'
import MeetModalFooter from './MeetModalFooter'
import { DefaultMeetForCalendar } from './Calendar'

// pass the event into this and display the event info
interface EventTagProps {
    meet: MeetForCalendar,
    user: Decoded | null,
    className?: string
}

const EventTag: React.FC<EventTagProps> = props => {
    let startTime = moment(props.meet.start).format("hh:mm a")
    let endTime = moment(props.meet.end).format("hh:mm a")

    const {className} = props;


    let [currentMeet, setCurrentMeet] = useState<MeetForCalendar | DefaultMeetForCalendar>({
        _id: null,
        creator: null,
        private: null,
        title: null,
        date: null,
        start: null,
        end: null,
        description: null,
        users: null,
        activity: {
            name: null,
            locations: {
                name: null,
                address: null,
                city: null,
                state: null,
                zip: null,
                lat: null,
                long: null,
            }
        },
        myPrivateMeet: null,
        myPublicMeet: null,
        attending: null
    })

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const showDetails = (meet: MeetForCalendar) => {
        setCurrentMeet(meet)
        toggle()
    }

    const handleEdit = () => {
        // feed edit meet info and link
        
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
            <Button color="info" onClick={meet => showDetails(props.meet)}>More Info</Button>{' '}
            <Button color="info" >View</Button> {' '}
            <Button onClick={handleEdit} color="info">Edit</Button>

            <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}><h1>{currentMeet.title}</h1></ModalHeader>
              <ModalBody>
                <MeetModalBody currentMeet={currentMeet} user={props.user} />
              </ModalBody>
              
              <ModalFooter>
                  <MeetModalFooter currentMeet={currentMeet} user={props.user}/>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
    )
}

export default EventTag