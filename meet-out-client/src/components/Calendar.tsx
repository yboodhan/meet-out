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
import { Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Decoded } from '../App';
import Meet from '../../../meet-out-server/src/models/meet'
import DisplayMap from './Map'
import MeetModalBody from './MeetModalBody'
import MeetModalFooter from './MeetModalFooter'

interface CalendarProps {
    // buttonLabel?: string,
    className?: string,
    user: Decoded | null,
    myPrivateMeets: MeetForCalendar[];
    myPublicMeets: MeetForCalendar[];
    attendingPublicMeets: MeetForCalendar[];
    notAttendingPublicMeets: MeetForCalendar[];
}

export interface DefaultMeetForCalendar {
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

    //function to go to add event form
        const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => {
            //link to  add form
    }
    
    return (
        <Container>
        <h2>Calendar:</h2>
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
            <ModalHeader toggle={toggle}><h1>{currentMeet.title}</h1></ModalHeader>
              <ModalBody>
                <MeetModalBody currentMeet={currentMeet} user={props.user} />
              </ModalBody>
              
              <ModalFooter>
                  <MeetModalFooter currentMeet={currentMeet} user={props.user}/>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
        </Container>
    )
}

export default MyCalendar