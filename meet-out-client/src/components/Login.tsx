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

    // Submit the form
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then( (response: Response) => {
          response.json()
          .then( result => {
            if (response.ok) {
              // Update the user's token
              props.updateUser( result.token )
            } else {
              setMessage(`${response.status} ${response.statusText}: ${result.message}`)
            }
          })
        })
        .catch( (err: Error) => {
          console.log(err)
          setMessage(`${err.toString()}`)
        })
        }

    // If user, redirect
    if (props.user) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
        <Container>
        <Form onSubmit={handleSubmit}>
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
                    <Input type="email" name="email" autoFocus onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
                    <FormText color="danger">{message}</FormText>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Input type="password" name="password" onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required/>
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