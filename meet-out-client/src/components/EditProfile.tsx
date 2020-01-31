import React, { useState, FormEvent, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';
import Widget from './Widget'
import image from '../SelfieDoodle.png'

// Props
interface EditProfileProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const EditProfile: React.FC<EditProfileProps> = props => {
    let [email, setEmail] = useState(props.user ? props.user.email : '')
    let [firstname, setFirstname] = useState(props.user ? props.user.firstname : '')
    let [lastname, setLastname] = useState(props.user ? props.user.lastname : '')
    let [message, setMessage] = useState('')
    let [photo, setPhoto] = useState(props.user ? props.user.photo : '')
    let [referRedirect, setReferRedirect] = useState(false)

    // useEffect( () => {
    //     if (props.user) {
    //         setPassword(props.user.password)
    //     }
    // }, [])

    const updatePhoto = (photoUrl: string) => {
        console.log('setting new profile photo now', photoUrl)
        setPhoto(photoUrl)
        console.log('photo url', photo)
    }
    

    const handleSubmit = (e: FormEvent) => {
        console.log('submitting form data now')
        console.log(photo)
        e.preventDefault()

        let data: object = {
            id: props.user ? props.user._id : '',
            email,
            firstname,
            lastname,
            photo
        }

        let token = localStorage.getItem('userToken')

        fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then( (response: Response) => {
          response.json()
          .then( result => {
            if (response.ok) {
              props.updateUser( result.token )
              setReferRedirect(true)
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

    if (referRedirect) {
        return(
            <Redirect to = "/home" />
        )
    }

    if (!props.user) {
        return <Redirect to="/" />
    }


    return (

        <Container className="web-body">
            <h2>Edit your profile:</h2>
            <br />
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col m={6}>
                    <FormGroup>
                            <img src={photo ? photo : props.user.photo ? props.user.photo : image} alt="profile" className="img-fluid profile" width="400" />
                            <Widget updatePhoto={updatePhoto} />
                    </FormGroup>
                </Col>

                <Col m={6}>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="firstname" placeholder="First name" defaultValue={props.user.firstname} onChange={(e: FormEvent<HTMLInputElement>) => setFirstname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="lastname" placeholder="Last name" defaultValue={props.user.lastname} onChange={(e: FormEvent<HTMLInputElement>) => setLastname(e.currentTarget.value)} required/>
                        </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                            <Input type="email" name="email" placeholder="Email" defaultValue={props.user.email} onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required/>
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