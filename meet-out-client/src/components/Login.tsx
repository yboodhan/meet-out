import React from 'react'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, Label, Input, Row } from 'reactstrap';

// Props
interface LoginProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Login: React.FC<LoginProps> = props => {
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
                    <Input type="email" name="email" id="email" autofocus="autofocus" required/>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Input type="password" name="password" id="password" required/>
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