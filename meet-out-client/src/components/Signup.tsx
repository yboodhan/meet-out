import React from 'react'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';

const Signup: React.FC = () => {
    return (
        <div>
        <Container className="text-left">
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
        </Container>
        </div>
    )
}

export default Signup