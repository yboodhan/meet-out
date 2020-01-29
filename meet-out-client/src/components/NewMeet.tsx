import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Row } from 'reactstrap';
import { Decoded } from '../App';

interface NewMeetProps {
    user: Decoded | null
}

const NewMeet: React.FC<NewMeetProps> = props => {
    // Assign default state
    // Message displays on page
    let [message, setMessage] = useState('')

    // Form data
    let [activity, setActivity] = useState(' ')
    let [description, setDescription] = useState(' ')
    let [activityAddress, setAddress] = useState(' ')
    let [city, setCity] = useState(' ')
    let [state, setUSState] = useState(' ')
    let [zip, setZip] = useState(' ')
    let [date , setDate] = useState(' ')
    let [starttime, setStartTime] = useState(' ')
    let [endtime, setEndTime] = useState(' ')

    useEffect(() => {
        setMessage('')
    }, [activity, description, activityAddress, city, state, zip, date, starttime, endtime])

    const createNewMeet = (e: FormEvent) => {
        e.preventDefault()

        // Form data
        let data: object = {
            activity,
            description,
            activityAddress,
            city,
            state,
            zip,
            date,
            starttime,
            endtime
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                return(
                    <Redirect to = "/home" />
                )
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

    if (!props.user) {
        return(
            <Redirect to = "/" />
        )
    }

    return (
        <div>
        <Container className="text-left web-body">
        <Row>
        <Col md={12}>
            <h2>Create a new Meet!</h2>
            <Form onSubmit={createNewMeet}>
            {/* This is the WHAT section of a new Meet */}
                <Row form>
                <Col md={6}>
                    <FormGroup>
                        < Input id="activityName" type="text" name="activityName" placeholder="What are we doing?" onChange={(e: FormEvent<HTMLInputElement>) => setActivity(e.currentTarget.value)} required />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        < Input id="description" type="text" name="description" placeholder="Details" onChange={(e: FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)} />
                    </FormGroup>
                </Col>
                </Row>
            {/* End WHAT section of new Meet */}

            {/* This is the WHERE section of a new Meet */}
                <Row form>
                <Col md={7}>
                    <FormGroup>
                        < Input id="activityAddress" type="text" name="activityAddress" placeholder="Address" onChange={(e: FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)} required />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        < Input id="city" type="text" name="city" placeholder="City" onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)} required />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        < Input id="state" type="text" name="state" placeholder="State" onChange={(e: FormEvent<HTMLInputElement>) => setUSState(e.currentTarget.value)} required />
                        <FormText>2-Character Code</FormText>
                    </FormGroup>
                </Col>
                </Row>
                <Row form>
                    <FormGroup>
                        <Input id="zip" name="zip" type="number" placeholder="Zip Code" onChange={(e: FormEvent<HTMLInputElement>) => setZip(e.currentTarget.value)} required />
                    </FormGroup>
                </Row>
            {/* End WHERE section of a new Meet */}

            {/* This is the WHEN section of a new Meet */}
                <Row form>
                <Col md={4}>
                    <FormGroup>
                        < Input id="date" name="date" type="date" placeholder="Date" onChange={(e: FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)} required />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        < Input id="starttime" name="starttime" type="time" placeholder="Start Time" onChange={(e: FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        < Input id="endtime" name="endtime" type="time" placeholder="End Time" onChange={(e: FormEvent<HTMLInputElement>) => setEndTime(e.currentTarget.value)} />
                    </FormGroup>
                </Col>
                </Row>
            {/* End WHEN sectin of new Meet */}
            <FormText color="danger">{message}</FormText>
            <hr />
            <input type="hidden" value={props.user._id} />
            <Button type="submit" color="info" size="lg">Submit!</Button>{' '}
            </Form>
        </Col>
        </Row>
        </Container>
        </div>
    )
}

export default NewMeet