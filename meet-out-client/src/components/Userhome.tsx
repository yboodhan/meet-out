import React from 'react'

import List from './List'
import Calendar from './Calendar'

import {MeetForCalendar} from './Content'
import { Decoded } from '../App'

interface UserhomeProps {
    user: Decoded | null;
    myPrivateMeets: MeetForCalendar[];
    myPublicMeets: MeetForCalendar[];
    attendingPublicMeets: MeetForCalendar[];
    notAttendingPublicMeets: MeetForCalendar[];
}


const Userhome: React.FC<UserhomeProps> = (props) => {

    return (
        <div>
            <List />
            <Calendar user={props.user} 
                    myPrivateMeets={props.myPrivateMeets} 
                    myPublicMeets={props.myPublicMeets} 
                    attendingPublicMeets={props.attendingPublicMeets} 
                    notAttendingPublicMeets={props.notAttendingPublicMeets}  />
        </div>
    )
}

export default Userhome