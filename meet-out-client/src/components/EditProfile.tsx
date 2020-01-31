import React, { useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';
import Widget from './Widget'

// Props
interface EditProfileProps {
    user: Decoded | null
}

const EditProfile: React.FC<EditProfileProps> = props => {

    let [email, setEmail] = useState('')
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [message, setMessage] = useState('')
    
    if (!props.user) {
        return <Redirect to="/" />
    }

    const handleSubmit = (e: FormEvent) => {
        console.log('edited profile')
    }


    return (

        <Container className="web-body">
            <h2>Edit your profile:</h2>
            <br />
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col m={6}>
                    <FormGroup>
                            UPLOAD HERE
                            <Widget />
                    </FormGroup>
                </Col>

                <Col m={6}>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="firstname" placeholder="First name" value={props.user.firstname} onChange={(e: FormEvent<HTMLInputElement>) => setFirstname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="lastname" placeholder="Last name" value={props.user.lastname} onChange={(e: FormEvent<HTMLInputElement>) => setLastname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                            <Input type="email" name="email" placeholder="Email" value={props.user.email} onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
                    </FormGroup>
                    <FormText color="danger">{message}</FormText>
                    <hr />
                    <Button type="submit" color="info" size="lg">Update my profile!</Button>{' '}
                </Col>
            </Row>
            </Form>
        </Container>
    )
}

export default EditProfile