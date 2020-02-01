import React from 'react'
import {MeetForCalendar} from './Content'
import { Button } from 'reactstrap'

interface DeleteProps {
    meet: MeetForCalendar,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const Delete: React.FC<DeleteProps> = props => {

    const deleteMeet = () => {
        props.updateMeet(props.meet)
        console.log('set the current meet to this one')
        console.log(`${process.env.REACT_APP_SERVER_URL}/meet/${props.meet._id}`)

        let token = localStorage.getItem('userToken')
        console.log(token)

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${props.meet._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then( (response: Response) => {
            console.log(response)
            if (response.ok) {
                console.log('Response ok')
                console.log('deleted')
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
        <Button size="sm" color="danger" onClick={deleteMeet}>Delete</Button>
    )
}

export default Delete