import React, {useState} from 'react'
import { MeetForCalendar } from './Content';
import { DefaultMeetForCalendar } from './Calendar'
import { Decoded } from '../App';
import moment from 'moment'

interface ModalBodyProps {
  user: Decoded | null,
  currentMeet: MeetForCalendar | DefaultMeetForCalendar
}


const MeetDetailsModal: React.FC<ModalBodyProps> = props => {

  if(props.user) {

    let attendingUsers: JSX.Element | JSX.Element[] = <p>'No one is attending :('</p>

      if(props.currentMeet.myPrivateMeet) {
        attendingUsers = <h4>You</h4>
      } else if (props.currentMeet.users !== null) {
        attendingUsers = props.currentMeet.users?.map(u => {
          return <p>{u}</p>
        })
      }

      return (
        <div>
          <h3>Owner: {props.currentMeet.creator?.slice(0,8)} </h3>
          <h3>{ props.currentMeet.date ? props.currentMeet.date.toDateString() : 'not available'}</h3>
          <h3>{props.currentMeet.start ? props.currentMeet.start.toTimeString(): 'not available' } - {props.currentMeet.end ? props.currentMeet.end.toTimeString(): 'not available'}</h3>
          {/* find something to show date/time in pretty way? */}
          <h3>STUB - LOCATION INFO</h3>
          <h4>Attending:</h4>
          {attendingUsers}
        </div>
      );
  }
  return (
    <div>ERROR</div>
  )
}
export default MeetDetailsModal