import React from 'react'

import List from './List'
import Calendar from './Calendar'

interface UserhomeProps {
    myEventList: { 
        id: number,
        title: string,
        start: Date,
        end: Date }[]
}


const Userhome: React.FC<UserhomeProps> = (props) => {
    
    
    return (
        <div>
            <List />
            <Calendar myEventList={props.myEventList} />
        </div>
    )
}

export default Userhome