import React from 'react'
import { Col, Container, Row } from 'reactstrap';

import List from './List'
import Calendar from './Calendar'
import EventsDisplay from './EventsDisplay'

import {MeetForCalendar} from './Content'
import { Decoded } from '../App'

interface UserhomeProps {
    user: Decoded | null;
    myPrivateMeets: MeetForCalendar[];
    myPublicMeets: MeetForCalendar[];
    attendingPublicMeets: MeetForCalendar[];
    notAttendingPublicMeets: MeetForCalendar[];
}


const Userhome: React.FC<UserhomeProps> = (props) => {

    return (
        <Container className="web-body">

            <Row>
                <Col md={6}>
                    <Calendar user={props.user} 
                            myPrivateMeets={props.myPrivateMeets} 
                            myPublicMeets={props.myPublicMeets} 
                            attendingPublicMeets={props.attendingPublicMeets} 
                            notAttendingPublicMeets={props.notAttendingPublicMeets} 
                    />
                </Col>
                <Col md={6}>
                    <EventsDisplay 

                    />
                </Col>
            </Row>


        </Container>

    )
}

export default Userhome