import React from 'react'
import {MeetForCalendar} from './Content'
import { Button, Container } from 'reactstrap'


interface DeleteProps {
    meet: MeetForCalendar,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const Delete: React.FC<DeleteProps> = props => {

    const deleteMeet = () => {
        props.updateMeet(props.meet)
        let token = localStorage.getItem('userToken')

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${props.meet._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then( (response: Response) => {
            if (response.ok) {
                window.location.reload()
            } else {
                // Error
                console.log('error')
            }
        })
        .catch( (err: Error) => {
            console.log('Error', err)
        })


    }

    return (
        <Button size="sm" outline color="danger" onClick={deleteMeet}>Delete</Button>
    )
}

export default Delete