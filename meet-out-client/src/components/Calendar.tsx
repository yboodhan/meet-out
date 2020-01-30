import React, {useState} from 'react'
import {
    Calendar,
    // DateLocalizer,
    momentLocalizer,
    // globalizeLocalizer,
    // move,
    // Views,
    // Navigate,
    // components,
  } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MeetForCalendar} from './Content'
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Decoded } from '../App';
import { notDeepEqual } from 'assert'
import Meet from '../../../meet-out-server/src/models/meet'

interface CalendarProps {
    // buttonLabel?: string,
    className?: string,
    user: Decoded | null,
    myPrivateMeets: MeetForCalendar[];
    myPublicMeets: MeetForCalendar[];
    attendingPublicMeets: MeetForCalendar[];
    notAttendingPublicMeets: MeetForCalendar[];
}

interface DefaultMeetForCalendar {
    _id: null,
    creator: null,
    private: null,
    title: null,
    date: null,
    start: null,
    end: null,
    description: null,
    users: null,
    activity: {
        name: null,
        locations: {
            name: null;
            address: null;
            city: null;
            state: null;
            zip: null;
            lat: null;
            long: null;
          }
    },
    myPrivateMeet: null,
    myPublicMeet: null,
    attending: null
}


const MyCalendar: React.FC<CalendarProps> = (props) => {
    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment);

    //modal for showing more details
    const {className} = props;
    
    const [modal, setModal] = useState(false);
    const [currentMeet, setCurrentMeet] = useState<MeetForCalendar | DefaultMeetForCalendar>({
        _id: null,
        creator: null,
        private: null,
        title: null,
        date: null,
        start: null,
        end: null,
        description: null,
        users: null,
        activity: {
            name: null,
            locations: {
                name: null,
                address: null,
                city: null,
                state: null,
                zip: null,
                lat: null,
                long: null,
              }
        },
        myPrivateMeet: null,
        myPublicMeet: null,
        attending: null
    })
    


    let displayMeets = [...props.myPrivateMeets, ...props.myPublicMeets, ...props.attendingPublicMeets, ...props.notAttendingPublicMeets].map(meet => {
        return meet
    })
    
    
    const toggle = () => setModal(!modal);
    

    const showDetails = (meet: MeetForCalendar) => {
        setCurrentMeet(meet)
        toggle()
    }


    let editButton = <Button>EDIT</Button>
    let cancelButton = <Button>CANCEL</Button>
    let cancelAttendanceButton = <Button>CANCEL ATTENDANCE</Button>
    let attendButton = <Button>ATTEND</Button>


    // include:
                //delete button/functionality
                //if not already a user on the event, button to "add myself" to event that updates the meet with current user id
                //edit button/functionality? -- confirm waht this looks like if clicked
        

    //function to go to add event form
    // const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => {
    //     create bootstrap modal with add meet form
    // }
    
    return (
        <Container className="calendar">
            <Calendar
                selectable
                localizer={localizer}
                // events={props.allMeets}
                events={displayMeets}
                views={['month', 'week', 'day', 'agenda']}
                // startAccessor="start"
                // endAccessor="end"
                onSelectEvent={meet => showDetails(meet)} //show more details - function to be created
                onSelectSlot={({ start, end }) => window.prompt('New Event Name')} //add event when selecting a certain day/time - function to be created
                // drilldownView="agenda"
                // components={components} -can create custom components to replace existing components
            />
            <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{currentMeet.title} at {currentMeet.activity.locations.name}</ModalHeader>
              <ModalBody>
                    <h2>Owner: {currentMeet.myPrivateMeet ? 'You' : currentMeet.creator }</h2>
                    <h3>{ currentMeet.date ? currentMeet.date.toDateString() : 'not available'}</h3>
                    <h3>{currentMeet.start ? currentMeet.start.toTimeString(): 'not available' } - {currentMeet.end ? currentMeet.end.toTimeString(): 'not available'}</h3> {/* find something to show date/time in pretty way? */}
                    <h3>STUB - LOCATION INFO</h3>
                    <h4>Attending:
                        { currentMeet.users !== null ? currentMeet.users.forEach(u => 
                        (props.user && u === props.user._id) ? 'You' : {u}
                        ) : 'No one is attending :(' }
                    </h4>
              </ModalBody>
              
              <ModalFooter>
                  { currentMeet.myPrivateMeet || currentMeet.myPublicMeet ? editButton : (!currentMeet.myPublicMeet && currentMeet.attending ? cancelAttendanceButton : attendButton ) }
                {/* <Button color="primary" onClick={toggle}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button> */}
              </ModalFooter>
            </Modal>
          </div>
        </Container>
    )
}

export default MyCalendar