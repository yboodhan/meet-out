import React from 'react'
import { Button, Container } from 'reactstrap';


// pass the event into this and display the event info

const EventTag: React.FC = () => {
    return (
        <Container className="event-tag">
            <h4>Event Name</h4>
            <h5>Date</h5>
            <h6>Time</h6>
            <div className="text-truncate">
            <small>Description of the event in detail. SO much detail. Bla BLa.</small>
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