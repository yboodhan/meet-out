import React from 'react'
import {MeetForCalendar} from './Content'
import { Button, Container } from 'reactstrap'

interface DeleteProps {
    //meet info
    meet: MeetForCalendar
}

const Delete: React.FC<DeleteProps> = props => {
    return (
        <Button size="sm" color="danger">Delete</Button>
    )
}

export default Delete