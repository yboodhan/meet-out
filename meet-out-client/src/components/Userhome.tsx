import React from 'react'

import List from './List'
import Calendar from './Calendar'

import Meet from '../../../meet-out-server/src/models/meet'

interface UserhomeProps {
    allMeets: Meet[]
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