import React from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import image from '../SelfieDoodle.png'
import { Button, Container } from 'reactstrap';

// Props
interface ProfileProps {
    user: Decoded | null
}

const Profile: React.FC<ProfileProps> = props => {

    if (!props.user) {
        return <Redirect to="/" />
    }

    return (
        <Container className="web-body">
            <img src={image} className="img-fluid" width="400"/>
            <br />
            <a href="/profile/edit"><Button color="info"></Button></a>
            <hr />
            <h3>Name: {props.user.firstname} {props.user.lastname}</h3>
            <h3>Email: {props.user.email}</h3>
        </Container>
    )
}

export default Profile