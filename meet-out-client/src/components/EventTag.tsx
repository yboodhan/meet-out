import React from 'react'
import { Button, Container } from 'reactstrap'
import {MeetForCalendar} from './Content'


// pass the event into this and display the event info
interface EventTagProps {
    meet: MeetForCalendar
}

const EventTag: React.FC<EventTagProps> = props => {
    return (
        <Container className="event-tag">
            <h4>{props.meet.activity.name}</h4>
            <h5>{props.meet.date.toDateString()}</h5>
            <h6>{props.meet.start.toTimeString()}-{props.meet.end.toTimeString()}</h6>
            <div className="text-truncate">
            <small>{props.meet.description}</small>
            </div>

            <br />
            <Button color="info">More Info</Button>{' '}
            <Button color="info">View</Button> {' '}
            {/* only if user is creator */}
            <Button color="info">Edit</Button>

        </Container>
    )
}

export default EventTag