import React from 'react'
import {MeetForCalendar} from './Content'
import { Button, Container } from 'reactstrap'
import { PromiseProvider } from 'mongoose'

interface DeleteProps {
    meet: MeetForCalendar,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const Delete: React.FC<DeleteProps> = props => {

    const deleteMeet = () => {
        props.updateMeet(props.meet)
        console.log('set the current meet to this one')
        console.log(props.meet._id)
    }

    return (
        <Button size="sm" color="danger" onClick={deleteMeet}>Delete</Button>
    )
}

export default Delete