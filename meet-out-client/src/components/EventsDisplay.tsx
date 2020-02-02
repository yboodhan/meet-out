import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'


interface EventsDisplayProps {
    myMeets: any
}

const EventsDisplay: React.FC<EventsDisplayProps> = props => {

    let meetsToDisplay = [
        <div>
        <h4>No meets yet!</h4> 
        <hr/> 
        <h4>Schedule a meet <Link to='/create'>here.</Link></h4> 
        <br/> 
        <h4>Or click on any event on the calendar to join someone else in their outdoor endeavors!</h4>
        </div>]

    if (props.myMeets.length) {
        meetsToDisplay = props.myMeets
    }

    return (
        <Container>
        <h2>Upcoming Meets</h2>
        <hr/>
            <Container className="scroll-panel">
                {meetsToDisplay}
            </Container>
        </Container>
    )
}

export default EventsDisplay