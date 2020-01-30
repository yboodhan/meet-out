import React from 'react'

import List from './List'
import Calendar from './Calendar'

import {MeetForCalendar} from './Content'
import { Decoded } from '../App'

interface UserhomeProps {
    allMeets: MeetForCalendar[];
    user: Decoded | null;
}


const Userhome: React.FC<UserhomeProps> = (props) => {

    return (
        <div>
            <List />
            <Calendar allMeets={props.allMeets} user={props.user} />
        </div>
    )
}

export default Userhome