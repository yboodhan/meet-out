import React from 'react'
import {Button} from 'reactstrap'
import moment from 'moment'
import { Decoded } from '../App';
import { MeetForCalendar } from './Content';
import { DefaultMeetForCalendar } from './Calendar'
import { Link } from 'react-router-dom'

interface ModalFooterBodyProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | DefaultMeetForCalendar
  }
  
const MeetModalFooter: React.FC<ModalFooterBodyProps> = props => {

    const toEditForm = () => {
        return <Link to="/edit" />
    }

    let editButton = <Button className="button" onClick={toEditForm}>EDIT</Button>
    let cancelButton = <Button>CANCEL</Button>
    let cancelAttendanceButton = <Button>CANCEL ATTENDANCE</Button>
    let attendButton = <Button>ATTEND</Button>

    let showButtons: JSX.Element[]
    if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
        showButtons = [editButton, cancelButton]
    } else if(!props.currentMeet.myPublicMeet && props.currentMeet.attending) {
        showButtons = [cancelAttendanceButton]
    } else {
        showButtons = [attendButton]
    }

    return (
        <div>
            
            {showButtons}
                {/* <Button color="primary" onClick={toggle}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button> */}

        </div>
    )
}

export default MeetModalFooter