import React from 'react'
import { Button, Col, Container, Form, FormGroup, Label, Input, Row } from 'reactstrap';

const Login: React.FC = () => {
    return (
        <div>
        <Container>
        <Form>
            <Row form>
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
                    <Input type="email" name="email" id="email" autofocus="autofocus" />
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Input type="password" name="password" id="password"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                    <Button color="secondary">Log In</Button>
                </Col>
            </Row>
            

        </Form>
        </Container>
        </div>
    )
}

export default Login