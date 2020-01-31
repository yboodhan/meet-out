import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom'

import Calendar from './Calendar'
import EventsDisplay from './EventsDisplay'
import EventTag from './EventTag'
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
if (!props.user) {
    return(
        <Redirect to = "/" />
    )
} 

    let myPrivateEvents = props.myPrivateMeets.map( meet => {
        return <EventTag user={props.user} meet={meet}/>
    })

    let myPublicEvents = props.myPublicMeets.map( meet => {
        return <EventTag user={props.user} meet={meet}/>
    })

    let attendingPublicEvents = props.attendingPublicMeets.map( meet => {
        return <EventTag user={props.user} meet={meet}/>
    })

    let allEvents = myPrivateEvents.concat(myPublicEvents).concat(attendingPublicEvents)

    return (
        <Container className="web-body">

            <Row>

                <Col md={4}>
                    <EventsDisplay 
                        myMeets={allEvents}
                    />
                </Col>


                <Col md={8}>
                    <Calendar user={props.user} 
                            myPrivateMeets={props.myPrivateMeets} 
                            myPublicMeets={props.myPublicMeets} 
                            attendingPublicMeets={props.attendingPublicMeets} 
                            notAttendingPublicMeets={props.notAttendingPublicMeets} 
                    />
                </Col>


            </Row>

        </Container>

    )

}

export default Userhome