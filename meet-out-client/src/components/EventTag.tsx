import React from 'react'
import { Button, Container } from 'reactstrap'
import {MeetForCalendar} from './Content'
import Moment from 'react-moment'
import moment from 'moment'


// pass the event into this and display the event info
interface EventTagProps {
    meet: MeetForCalendar
}

const EventTag: React.FC<EventTagProps> = props => {
    let startTime = moment(props.meet.start).format("hh:mm a")
    let endTime = moment(props.meet.end).format("hh:mm a")


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
            <Button color="info">More Info</Button>{' '}
            <Button color="info">View</Button> {' '}
            {/* only if user is creator */}
            <Button color="info">Edit</Button>

        </Container>
    )
}

export default EventTag