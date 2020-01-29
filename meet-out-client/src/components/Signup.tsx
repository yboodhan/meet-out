import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';
import image from '../DogJumpDoodle.png'

// Props
interface SignupProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Signup: React.FC<SignupProps> = props => {

    // State variables
    let [email, setEmail] = useState('')
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')

    // Remove messages on typing
    useEffect(() => {
        setMessage('')
    }, [firstname, lastname, email, password])

    // Submit the form
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        // Form data
        let data: object = {
            email,
            firstname,
            lastname,
            password
        }
  
        // Send user data to server
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                // Update user info
                props.updateUser(result.token)
            } else {
                // Error
                setMessage(`${response.status} ${response.statusText}: ${result.message}`)
            }
            })
            .catch( (err: Error) => console.log(err))
        })
        .catch( (err: Error) => {
            console.log('Error', err)
            setMessage(`Error: ${err.toString()}`)
        })
    
    }
    
    // If user, redirect
    if (props.user) {
        return <Redirect to="/profile" />
    }

    return (
        <div>
        <Container className="text-left web-body">
        <Row>
        <Col md={6}>
        <img src={image} className="img-fluid"/> 
        </Col>
        <Col md={6}>
        <p className="app-description">Welcome to Meet Out(side). Let's do some outdoor activities together.</p>
        <h1>Create a New Account</h1>
        <Form onSubmit={handleSubmit}>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Input type="text" name="firstname" id="firstname" placeholder="First name" onChange={(e: FormEvent<HTMLInputElement>) => setFirstname(e.currentTarget.value)} required/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Input type="text" name="lastname" id="lastname" placeholder="Last name" onChange={(e: FormEvent<HTMLInputElement>) => setLastname(e.currentTarget.value)} required/>
                </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
            </FormGroup>
            <FormGroup>
                    <Input type="password" name="password" id="password" placeholder="Password" onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required/>
                    <FormText>Must be at least 8 characters.</FormText>
            </FormGroup>
            <FormText color="danger">{message}</FormText>
            <hr />
            <Button type="submit" color="info" size="lg">Sign up!</Button>{' '}
        </Form>
        </Col>
        </Row>
        </Container>
        </div>
    )
}

export default Signup