import React from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import image from '../SelfieDoodle.png'
import { Col, Container, Row } from 'reactstrap';

// Props
interface ProfileProps {
    user: Decoded | null
}

const Profile: React.FC<ProfileProps> = props => {

    if (!props.user) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <Row>
                <Col m={6}>
                    <h3>Name: {props.user.firstname} {props.user.lastname}</h3>
                    <h2>Email: {props.user.email}</h2>
                </Col>
                <Col m={6}>
                    <img src={image} className="img-fluid home-image"/> 
                </Col>
            </Row>
        </Container>
    )
}

export default Profile