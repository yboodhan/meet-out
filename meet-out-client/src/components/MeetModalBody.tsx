import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MeetForCalendar } from './Content';
import { DefaultMeetForCalendar } from './Calendar'
import { Decoded } from '../App';

interface ModalBodyProps {
  user: Decoded | null,
  currentMeet: MeetForCalendar | DefaultMeetForCalendar
}


const MeetDetailsModal: React.FC<ModalBodyProps> = props => {

// if(props.currentMeet.myPrivateMeet) {

// }

  return (
    <div>
     <h3>Owner: {props.currentMeet.creator?.slice(0,8)} </h3>
    <h3>{ props.currentMeet.date ? props.currentMeet.date.toDateString() : 'not available'}</h3>
                    {/* <h3>{currentMeet.start ? currentMeet.start.toTimeString(): 'not available' } - {currentMeet.end ? currentMeet.end.toTimeString(): 'not available'}</h3>  */}
                    {/* find something to show date/time in pretty way? */}
                    {/* <h3>STUB - LOCATION INFO</h3>
                    <h4>Attending:
                        { currentMeet.users !== null ? currentMeet.users.forEach(u => 
                        (props.user && u === props.user._id) ? 'You' : {u}
                        ) : 'No one is attending :(' }
                    </h4> */}
    </div>
  );
}
export default MeetDetailsModal