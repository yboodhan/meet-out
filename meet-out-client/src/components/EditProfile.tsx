import React from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Container } from 'reactstrap';

interface EditProfileProps {
    user: Decoded | null
}

const EditProfile: React.FC<EditProfileProps> = props => {
    
    if (!props.user) {
        return <Redirect to="/" />
    }

    return (
        <Container className="web-body">
            <h2>Edit your profile:</h2>
            <br />
            <Button type="submit" color="info">UPDATE MY PROFILE</Button>
        </Container>
    )
}

export default EditProfile