import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { Decoded, Meet, User } from '../App';
import {MeetForCalendar} from './Content'

interface EditMeetProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar | null,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const EditMeet: React.FC<EditMeetProps> = props => {
    let [message, setMessage] = useState('')

    // Form data
    let [activityName, setActivityName] = useState(props.currentMeet ? props.currentMeet.activity.name : '')
    let [description, setDescription] = useState(props.currentMeet ? props.currentMeet.description : '')
    let [activityAddress, setAddress] = useState(props.currentMeet ? props.currentMeet.activity.locations.address : '')
    let [city, setCity] = useState(props.currentMeet ? props.currentMeet.activity.locations.city : '')
    let [state, setUSState] = useState(props.currentMeet ? props.currentMeet.activity.locations.state : '')
    let [zip, setZip] = useState(props.currentMeet ? props.currentMeet.activity.locations.zip : '')
    let [date , setDate] = useState(props.currentMeet ? props.currentMeet.date : '')
    let [starttime, setStartTime] = useState(props.currentMeet ? props.currentMeet.starttime : '')
    let [endtime, setEndTime] = useState(props.currentMeet ? props.currentMeet.endtime : '')
    let [users, setUsers] = useState(props.currentMeet ? props.currentMeet.users : [])
    let [creator, setCreator] = useState(props.currentMeet ? props.currentMeet.creator : '')
    let [privateMeet, setPrivateMeet] = useState(props.currentMeet ? props.currentMeet.private : '')
    let [referRedirect, setReferRedirect] = useState(false)

    useEffect(() => {
        if (props.user) {
            setCreator(props.user._id)
            // setUsers(props.user._id)
        }
        setMessage('')
    }, [props.user, activityName, description, activityAddress, city, state, zip, date, starttime, endtime])



    const createNewMeet = (e: FormEvent) => {
        e.preventDefault()


        // Form data
        let data = {
            id: props.currentMeet ? props.currentMeet._id : null,
            creator: creator,
            private: privateMeet,
            date: new Date(date),
            starttime: starttime,
            endtime: endtime,
            description: description,
            users: users,
            activity: { name: activityName,
                locations: {
                address: activityAddress,
                city: city,
                state: state,
                zip: zip,
                }
            }
        }

        console.log('data is', data)

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {

                console.log('Response ok', response, 'RESULT 🌷🌷🌷🌷🌷', result)
                const amAttending = (result: any) => {
                    for(let i = 0; i < result.users.length; i++) {
                        if(result.users[i]._id === props.user?._id) {
                            return true
                        }
                    }
                    return false
                }
                props.updateMeet({
                    _id: result._id,
                    title: result.activity.name,
                    creator: result.creator,
                    private: result.private,
                    date: new Date(result.date),
                    start: result.starttime,
                    end: result.endtime,
                    description: result.description,
                    users: result.users,
                    activity: result.activity,
                    myPrivateMeet: (props.user != null && result.creator == props.user._id && result.private) ? true : false,
                    myPublicMeet: (props.user != null && result.creator == props.user._id && !result.private) ? true : false,
                    attending: amAttending(result) ? true : false
                    })

//                 console.log('Response ok', response)
//                 console.log('Result: ', result)
//                 props.updateMeet(result)

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
            <Redirect to = "/" />
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
                            < Input id="date" name="date" type="date" placeholder="Date" onChange={(e: FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)} required />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="starttime">Start:</Label>
                                    < Input id="starttime" name="starttime" type="time"  placeholder="Start Time" onChange={(e: FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">End:</Label>
                                    < Input id="endtime" name="endtime" type="time"  placeholder="End Time" onChange={(e: FormEvent<HTMLInputElement>) => setEndTime(e.currentTarget.value)} required />
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
                <Button type="submit" className="blue-btn" size="lg">Submit!</Button>{' '}
            </Form>
        </Container>
        </div>
    )
}

export default EditMeet