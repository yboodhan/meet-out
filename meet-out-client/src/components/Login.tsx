import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap';

// Props
interface LoginProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Login: React.FC<LoginProps> = props => {

    // State variables
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')

    // Update the message whenever something else is typed
    useEffect(() => {
        setMessage('')
    }, [email, password])

    //TODO: HANDLE SUBMIT
    

    // If user, redirect
    if (props.user) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
        <Container>
        <Form>
            <Row form className="text-left">
                <Col md={5}>
                    <Label for="email">Email</Label>
                </Col>
                <Col md={5}>
                    <Label for="password">Password</Label>
                </Col>
            </Row>
            <Row form>
                <Col md={5}>
                <FormGroup>
                    <Input type="email" name="email" id="email" autofocus="autofocus" onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
                    <FormText color="danger">{message}</FormText>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Input type="password" name="password" id="password" onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required/>
                </FormGroup>
                </Col>
                <Col md={2}>
                    <Button type="submit" color="info">Log In</Button>
                </Col>
            </Row>
        </Form>
        </Container>
        </div>
    )
}

export default Login