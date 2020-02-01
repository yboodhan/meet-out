import React from 'react'
import { Decoded } from '../App';
import {MeetForCalendar} from './Content'
import { Redirect } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap';
import DisplayMap from './DisplayMap'

// takes in the current meet value and spits out info
// can be accessed when the meet is created and by link from calendar page (onclick)

interface ShowMeetProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null
}

const ShowMeet: React.FC<ShowMeetProps> = props => {

    // If no user/meet, send to home page
    if (!props.user) {
       return <Redirect to='/' />
    }

    if (!props.currentMeet) {
        return <Redirect to='/' />
    }
    
    let creator: string = ''
        if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
            creator = 'You'
        } else {
            creator = props.currentMeet.users.find((user) => user._id  === (props.currentMeet ? props.currentMeet.creator : ''))?.firstname as string
        }

    return (
        <Container className="web-body show-page">
            <h1>{props.currentMeet.title}</h1>
            <p>Hosted by: {creator}</p>
            <hr />
            <Row>
                <Col md={6}>

                </Col>
                <Col md={6}>

                    <Row>
                        <DisplayMap />
                    </Row>
                </Col>
            </Row>


        </Container>
    )
}

export default ShowMeet

// title: string,
// creator: string,
// private: boolean,
// date: Date,
// start: Date,
// starttime?: Date,
// endtime?: Date,
// end: Date,
// description: string,
// users: User[],
// activity: {
//     name: string,
//     locations: {
//         name: string;
//         address: string;
//         city: string;
//         state: string;
//         zip: number;
//         lat: number;
//         long: number;
//     }
// },
// myPrivateMeet: boolean,
// myPublicMeet: boolean,
// attending: boolean