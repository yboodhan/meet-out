import React from 'react'

import List from './List'
import Calendar from './Calendar'

const Home: React.FC = () => {
    return (
        <div>
            <List />
            <Calendar />
        </div>
    )
}

export default Home