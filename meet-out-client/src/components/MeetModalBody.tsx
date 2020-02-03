import React from 'react'
import { MeetForCalendar } from './Content';
import { Decoded } from '../App';
import moment from 'moment'
import {Badge, Container } from 'reactstrap'

interface ModalBodyProps {
  user: Decoded | null,
  currentMeet: MeetForCalendar 
}


const MeetDetailsModal: React.FC<ModalBodyProps> = props => {

      moment(props.currentMeet.date?.toDateString()).format("MM/DD/YYYY")
    
    // let attendingUsers: JSX.Element | JSX.Element[] = <p>'No one is attending :('</p>
    //   if (props.currentMeet?.users !== null) {
    //     attendingUsers = props.currentMeet.users?.map(u => {
    //       if(u._id === props.user?._id) {
    //         return <p>You</p>
    //       } else {
    //       return <p>{u.firstname}</p>
    //     }
    //     })
    //   }

  let creator: string = ''
    if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
      creator = 'You'
    } else {
      creator = props.currentMeet.users.find((user) => user._id  === props.currentMeet.creator)?.firstname as string
    }
    
    let mapLinkText = 'location unavailable'
    let mapLink = '#'
    if(props.currentMeet.activity.locations.address !== null){
      mapLinkText = `${props.currentMeet.activity.locations.address}, ${props.currentMeet.activity.locations.city}, ${props.currentMeet.activity.locations.state}, ${props.currentMeet.activity.locations.zip} `
      mapLink = `https://maps.google.com/?q=${props.currentMeet.activity.locations.address + props.currentMeet.activity.locations.city + props.currentMeet.activity.locations.state + props.currentMeet.activity.locations.zip}`
    }
      return (
        
        <Container>

              <p>Hosted by: {creator}</p>
              <h6>{props.currentMeet.date ? props.currentMeet.start.toDateString() : 'not available'}</h6>
              <p>{props.currentMeet.start ? moment(props.currentMeet.start).format("h:mm a"): 'not available' } - {props.currentMeet.end ? moment(props.currentMeet.end).format("h:mm a"): 'not available'}</p>
            {/* find something to show date/time in pretty way? */}
              <a href={mapLink} target="_blank" rel="noopener noreferrer"> {mapLinkText} </a>
              <br/>
              <br/>
              <h6>Attendees: <Badge color="secondary">{props.currentMeet.users.length}</Badge></h6>
              {/* {attendingUsers} */}

        </Container>
      );
  
}
export default MeetDetailsModal