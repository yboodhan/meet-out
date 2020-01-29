import React, { useState, FormEvent } from 'react'
import cloudinary from 'cloudinary-core'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';

// Props
interface EditProfileProps {
    user: Decoded | null
}

const EditProfile: React.FC<EditProfileProps> = props => {

    console.log(cloudinary)
    let cloudCore = new cloudinary.Cloudinary({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME })

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

    let myWidget = () => window.cloudinary.createUploadWidget({
        cloudName: process.env.CLOUDINARY_CLOUD_NAME, 
        uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET_NAME},

        // Specify later
        (error: Error, result: any) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
          }
        }
    )

    return (

        <Container className="web-body">
            <h2>Edit your profile:</h2>
            <br />
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col m={6}>
                    <FormGroup>
                            PUT PHOTO HERE
                    </FormGroup>
                </Col>

                <Col m={6}>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="firstname" id="firstname" placeholder="First name" value={props.user.firstname} onChange={(e: FormEvent<HTMLInputElement>) => setFirstname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="lastname" id="lastname" placeholder="Last name" value={props.user.lastname} onChange={(e: FormEvent<HTMLInputElement>) => setLastname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                            <Input type="email" name="email" id="email" placeholder="Email" value={props.user.email} onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
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