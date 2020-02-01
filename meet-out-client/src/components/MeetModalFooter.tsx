import React, {useState} from 'react'
import {Button} from 'reactstrap'
import JoinMeetButton from './JoinMeetButton'
import LeaveMeetButton from './LeaveMeetButton'
import moment from 'moment'
import { Decoded } from '../App';
import { MeetForCalendar } from './Content';
// import { DefaultMeetForCalendar } from './Calendar'
import { Redirect } from 'react-router-dom'

interface ModalFooterBodyProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar
    updateMeet: (currentMeet: MeetForCalendar | null) => void
    toggle: () => void
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

    let joinButton = <JoinMeetButton toggle={props.toggle} user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>
    let editButton = <Button onClick={handleMeet} color="info">Edit</Button>
    let cancelButton = <Button>CANCEL</Button>
    let leaveButton = <LeaveMeetButton toggle={props.toggle} user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>

    let showButtons: JSX.Element[]
    if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
        showButtons = [editButton, cancelButton]
    } else if(!props.currentMeet.myPublicMeet && props.currentMeet.attending) {
        showButtons = [leaveButton]
    } else {
        showButtons = [joinButton]
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