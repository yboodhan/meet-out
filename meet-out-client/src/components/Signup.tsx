import React from 'react'
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
    // let [email, setEmail] = useState('')
    // let [firstname, setFirstname] = useState('')
    // let [lastname, setLastname] = useState('')
    // let [message, setMessage] = useState('')
    // let [password, setPassword] = useState('')
    // let [profileUrl, setProfileUrl] = useState('')

    return (
        <div>
        <Container className="text-left">
        <Row>
        <Col md={6}>
        <img src={image} className="img-fluid home-image"/> 
        </Col>
        <Col md={6}>
        <p className="app-description">Welcome to Meet Out(side). Let's do some outdoor activities together.</p>
        <h1>Create a New Account</h1>
        <Form>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Input type="text" name="firstname" id="firstname" placeholder="First name" required/>
                    <FormText color="danger"></FormText>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Input type="text" name="lastname" id="lastname" placeholder="Last name" required/>
                    <FormText color="danger"></FormText>
                </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" required/>
                    <FormText color="danger"></FormText>
            </FormGroup>
            <FormGroup>
                    <Input type="password" name="password" id="password" placeholder="Password" required/>
                    <FormText>Must be at least 8 characters.</FormText>
            </FormGroup>
            <Button type="submit" color="info" size="lg">Sign up!</Button>{' '}
        </Form>
        </Col>
        </Row>
        </Container>
        </div>
    )
}

export default Signup