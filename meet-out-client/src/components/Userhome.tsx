import React from 'react'

import List from './List'
import Calendar from './Calendar'

import { TMeets } from './Content'

interface UserhomeProps {
    allMeets: TMeets[]
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