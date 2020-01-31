import React from 'react'
import { Decoded } from '../App';
import {MeetForCalendar} from './Content'
import { Redirect } from 'react-router-dom'

// takes in the current meet value and spits out info
// can be accessed when the meet is created and by link from calendar page (onclick)

interface ShowMeetProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null
}

const ShowMeet: React.FC<ShowMeetProps> = props => {

    // If no user, send to home page
    if (!props.user) {
       return <Redirect to='/' />
    }

    return (
        <div>
            Show meet stub
        </div>
    )
}

export default ShowMeet