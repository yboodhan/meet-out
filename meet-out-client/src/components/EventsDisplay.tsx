import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'


interface EventsDisplayProps {
    myMeets: any
}

const EventsDisplay: React.FC<EventsDisplayProps> = props => {

    let meetsToDisplay = [<h4>No meets yet! Create one <Link to='/create'>here.</Link></h4>]

    if (props.myMeets.length) {
        meetsToDisplay = props.myMeets
    }

    return (
        <Container>
        <h2>My Events:</h2>
            <Container className="scroll-panel">
                {meetsToDisplay}
            </Container>
        </Container>
    )
}

export default EventsDisplay