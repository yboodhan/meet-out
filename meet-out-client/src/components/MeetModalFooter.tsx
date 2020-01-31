import React, {useState} from 'react'
import {Button} from 'reactstrap'
import moment from 'moment'
import { Decoded } from '../App';
import { MeetForCalendar } from './Content';
// import { DefaultMeetForCalendar } from './Calendar'
import { Redirect } from 'react-router-dom'

interface ModalFooterBodyProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar
    updateMeet: (currentMeet: MeetForCalendar | null) => void
  }
  
const MeetModalFooter: React.FC<ModalFooterBodyProps> = props => {
    
    let [referRedirect, setReferRedirect] = useState(false)

    const handleMeet = () => {
        console.log('redirecting')
        //update the current meet
        props.updateMeet(props.currentMeet)
        setReferRedirect(true)
    }

    if (referRedirect) {
        return (
            <Redirect to='/edit' />
        )
    }

    let editButton = <Button onClick={handleMeet} color="info">Edit</Button>
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