import React from 'react'
import { Container } from 'reactstrap'
import EventTag from './EventTag'

const EventsDisplay: React.FC = () => {
    return (
        <Container>
        <h2>All Events:</h2>
        <Container className="scroll-panel">
            <EventTag />
        </Container>
        </Container>
    )
}

export default EventsDisplay