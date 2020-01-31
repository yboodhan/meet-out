import React from 'react'
import { Container } from 'reactstrap'


interface EventsDisplayProps {
    myMeets: any
}

const EventsDisplay: React.FC<EventsDisplayProps> = props => {
    return (
        <Container>
        <h2>All Events:</h2>
            <Container className="scroll-panel">
                {props.myMeets}
            </Container>
        </Container>
    )
}

export default EventsDisplay