import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { Decoded } from '../App';
import {MeetForCalendar} from './Content'

interface EditMeetProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null
}

const EditMeet: React.FC<EditMeetProps> = props => {
    let [message, setMessage] = useState('')

    // Form data
    let [activityName, setActivityName] = useState('')
    let [description, setDescription] = useState('')
    let [activityAddress, setAddress] = useState('')
    let [city, setCity] = useState('')
    let [state, setUSState] = useState('')
    let [zip, setZip] = useState('')
    let [date , setDate] = useState('')
    let [starttime, setStartTime] = useState('')
    let [endtime, setEndTime] = useState('')
    let [users, setUsers] = useState([])
    let [creator, setCreator] = useState('')
    let [privateMeet, setPrivateMeet] = useState(false)
    let [referRedirect, setReferRedirect] = useState(false)

    useEffect(() => {
        if (props.user) {
            setCreator(props.user._id)
            setUsers(props.user._id)
        }
        setMessage('')
    }, [props.user, activityName, description, activityAddress, city, state, zip, date, starttime, endtime])



    const createNewMeet = (e: FormEvent) => {
        e.preventDefault()


        // Form data
        let data: object = {
            id: props.currentMeet ? props.currentMeet._id : null,
            users,
            activityName,
            description,
            activityAddress,
            city,
            state,
            zip,
            date,
            starttime,
            endtime,
            creator,
            privateMeet
        }

        console.log('data is', data)

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                console.log('Response ok', response)
                setReferRedirect(true)
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

    if (referRedirect) {
        return(
            <Redirect to = "/home" />
        )
    }

    if (!props.user) {
        return(
            <Redirect to = "/" />
        )
    } 

    if (!props.currentMeet) {
        return(
            <Redirect to = "/home" />
        )
    }

    return (
        <div>
        <Container className="text-left web-body">
            <h2>Create a new event:</h2>
            <br />
            <Form onSubmit={createNewMeet}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="activityName"><h5>Event Name:</h5></Label>
                            <Input id="activityName" type="text" name="activityName" placeholder="What are we doing?" defaultValue={props.currentMeet.activity.name} onChange={(e: FormEvent<HTMLInputElement>) => setActivityName(e.currentTarget.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description"><h5>Event Description:</h5></Label>
                            <Input id="description" type="textarea" name="description" placeholder="Details" defaultValue={props.currentMeet.description} onChange={(e: FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)} required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="address"><h5>Location Details:</h5></Label>
                            <Input id="address" type="text" name="activityAddress" placeholder="Address" defaultValue={props.currentMeet.activity.locations.address} onChange={(e: FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Input id="city" type="text" name="city" placeholder="City"  defaultValue={props.currentMeet.activity.locations.city} onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)} required />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Input id="state" type="text" name="state" placeholder="State" defaultValue={props.currentMeet.activity.locations.state} maxLength={2} onChange={(e: FormEvent<HTMLInputElement>) => setUSState(e.currentTarget.value)} required />
                                    <FormText>Two-character state code only.</FormText>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input id="zip" name="zip" type="number" placeholder="Zip Code" defaultValue={props.currentMeet.activity.locations.zip} onChange={(e: FormEvent<HTMLInputElement>) => setZip(e.currentTarget.value)} required />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Label for="address"><h5>Updated Time Details:</h5></Label>
                        <FormGroup>
                            <Label for="address">Date:</Label>
                            < Input id="date" name="date" type="date" placeholder="Date" defaultValue={props.currentMeet.date.toDateString()} onChange={(e: FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)} required />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="starttime">Start:</Label>
                                    < Input id="starttime" name="starttime" type="time" defaultValue={props.currentMeet.start.toTimeString()} placeholder="Start Time" onChange={(e: FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">End:</Label>
                                    < Input id="endtime" name="endtime" type="time" defaultValue={props.currentMeet.end.toTimeString()} placeholder="End Time" onChange={(e: FormEvent<HTMLInputElement>) => setEndTime(e.currentTarget.value)} required />
                                </FormGroup> 
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="address"><h5>Updated Privacy Details:</h5></Label>
                            <FormGroup>
                                    <Input type="checkbox" name="private" onChange={(e: FormEvent<HTMLInputElement>) => setPrivateMeet(e.currentTarget.checked)}/>{' '}
                                    Private <FontAwesomeIcon icon={faLock}/>
                                <FormText>This event will only be accessible to you.</FormText>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <FormText color="danger">{message}</FormText>
                <Button type="submit" color="info" size="lg">Submit!</Button>{' '}
            </Form>
        </Container>
        </div>
    )
}

export default EditMeet