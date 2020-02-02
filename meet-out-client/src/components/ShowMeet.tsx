import React, {useState} from 'react'
import { Decoded } from '../App';
import {MeetForCalendar} from './Content'
import { Link, Redirect } from 'react-router-dom'
import { Button, Col, Container, Row, Badge } from 'reactstrap';
import DisplayMap from './DisplayMap'
import moment from 'moment'
import JoinMeetButton from './JoinMeetButton'
import LeaveMeetButton from './LeaveMeetButton'
import Delete from './Delete'

// takes in the current meet value and spits out info
// can be accessed when the meet is created and by link from calendar page (onclick)

interface ShowMeetProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null,
    updateMeet: (currentMeet: MeetForCalendar | null) => void

}

const ShowMeet: React.FC<ShowMeetProps> = props => {

    let [referRedirect, setReferRedirect] = useState(false)

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

    let attendees = props.currentMeet.users.map( user => {
        return <div>{user.firstname as string}</div>
    })

    let mapLinkText = 'location unavailable'
    let mapLink = '#'
    if(props.currentMeet.activity.locations.address !== null){
      mapLinkText = `${props.currentMeet.activity.locations.address}, ${props.currentMeet.activity.locations.city}, ${props.currentMeet.activity.locations.state}, ${props.currentMeet.activity.locations.zip} `
      mapLink = `https://maps.google.com/?q=${props.currentMeet.activity.locations.address + props.currentMeet.activity.locations.city + props.currentMeet.activity.locations.state + props.currentMeet.activity.locations.zip}`
    }

    const handleMeet = () => {
        //update the current meet
        props.updateMeet(props.currentMeet)
        setReferRedirect(true)
    }

    if (referRedirect) {
        return (
            <Redirect to='/edit' />
        )
    }

    let joinButton = <JoinMeetButton user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>
    let editButton = <Button onClick={handleMeet} size="sm" className={'mr-1 blue-btn'}>Edit</Button>
    let cancelButton = <Delete meet={props.currentMeet} updateMeet={props.updateMeet}/>
    let leaveButton = <LeaveMeetButton user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>

    let showButtons: JSX.Element[]
    if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
        showButtons = [editButton, cancelButton]
    } else if(!props.currentMeet.myPublicMeet && props.currentMeet.attending) {
        showButtons = [leaveButton]
    } else {
        showButtons = [joinButton]
    }

    console.log('🌷🌷🌷🌷 currentMeet at show page',props.currentMeet)

    return (
        <Container className="web-body show-page">
            <Link to="/home" className="dark-blue-text">&larr; Home</Link>
            <h1>{props.currentMeet.title}</h1>
            <p>Hosted by: {creator}</p>
            <hr />
            <Row>
                <Col md={6}>
                <h6>Details:</h6>
                <p>{props.currentMeet.description}</p>
                <br />
                <h6>Attendees: <Badge color="secondary">{props.currentMeet.users.length}</Badge></h6>
                {attendees}
                </Col>
                <Col md={6}>
                <h6>When:</h6>
                <p>{props.currentMeet.date ? props.currentMeet.date.toDateString() : 'not available'}</p>
                <p>{props.currentMeet.start ? moment(props.currentMeet.start).format("h:mm a"): 'not available' } - {props.currentMeet.end ? moment(props.currentMeet.end).format("h:mm a"): 'not available'}</p>
                <h6>Where:</h6>
                <a href={mapLink} target="_blank" rel="noopener noreferrer"> {mapLinkText} </a>
                <DisplayMap currentMeet={props.currentMeet}/>
                </Col>
            </Row>
            <Row>
                {showButtons}
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