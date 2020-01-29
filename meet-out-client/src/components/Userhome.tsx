import React from 'react'

import List from './List'
import Calendar from './Calendar'

import {MeetForCalendar} from './Content'

interface UserhomeProps {
    allMeets: MeetForCalendar[]
}


const Userhome: React.FC<UserhomeProps> = (props) => {

    return (
        <div>
            <List />
            <Calendar allMeets={props.allMeets} />
        </div>
    )
}

export default Userhome