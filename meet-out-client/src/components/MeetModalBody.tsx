import React from 'react'
import { MeetForCalendar } from './Content';
// import { DefaultMeetForCalendar } from './Calendar'
import { Decoded } from '../App';
import moment from 'moment'

interface ModalBodyProps {
  user: Decoded | null,
  currentMeet: MeetForCalendar 
}


const MeetDetailsModal: React.FC<ModalBodyProps> = props => {

  if(props.user) {

    if(props.currentMeet.date) {
      moment(props.currentMeet.date.toDateString()).format("MM/DD/YYYY")
    }

    let attendingUsers: JSX.Element | JSX.Element[] = <p>'No one is attending :('</p>
      if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
        attendingUsers = <p>You</p>
      } else if (props.currentMeet?.users !== null) {
        attendingUsers = props.currentMeet.users?.map(u => {
          return <p>{u}</p>
        })
      }
    
    let mapLinkText = 'location unavailable'
    let mapLink = '#'
    if(props.currentMeet.activity.locations.address !== null){
      mapLinkText = `${props.currentMeet.activity.locations.address}, ${props.currentMeet.activity.locations.city}, ${props.currentMeet.activity.locations.state}, ${props.currentMeet.activity.locations.zip} `
      mapLink = `https://maps.google.com/?q=${props.currentMeet.activity.locations.address + props.currentMeet.activity.locations.city + props.currentMeet.activity.locations.state + props.currentMeet.activity.locations.zip}`
    }
      return (
        <div>
          <h4>{ props.currentMeet.date ? props.currentMeet.date.toDateString() : 'not available'}</h4>
          <h4>{props.currentMeet.start ? moment(props.currentMeet.start).format("h:mm a"): 'not available' } - {props.currentMeet.end ? moment(props.currentMeet.end).format("h:mm a"): 'not available'}</h4>
          {/* find something to show date/time in pretty way? */}
          <h5>Owner: {props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet ? 'You' : props.currentMeet.creator?.slice(0,8)} </h5>

          <a href={mapLink} target="_blank" rel="noopener noreferrer"> {mapLinkText} </a>

          <h4>Who's Attending?</h4>
          {attendingUsers}
        </div>
      );
  }
  return (
    <div>ERROR</div>
  )
}
export default MeetDetailsModal