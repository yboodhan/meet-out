import React from 'react'
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

import Meet from '../../../meet-out-server/src/models/meet'

interface CalendarProps {
    allMeets: Meet[]
}


const MyCalendar: React.FC<CalendarProps> = (props) => {

    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment);

    //function to show more details on a meet
    // const showMeetDetails = (meet: TMeets) => {
    //     //create bootstrap modal with meet details included
            // include:
                //delete button/functionality
                //if not already a user on the event, button to "add myself" to event that updates the meet with current user id
                //edit button/functionality? -- confirm waht this looks like if clicked
    // }

    //function to add event
    // const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => {
    //     create bootstrap modal with add meet form
    // }
    
    return (
        <div className='calendar'>
            <Calendar
                selectable
                localizer={localizer}
                events={props.allMeets}
                views={['month', 'week', 'day', 'agenda']}
                startAccessor="starttime"
                endAccessor="endtime"
                onSelectEvent={meet => alert(meet.activity.name)} //show more details - function to be created
                onSelectSlot={({ start, end }) => window.prompt('New Event Name')} //add event when selecting a certain day/time - function to be created
                drilldownView="agenda"
                // components={components} -can create custom components to replace existing components
            />
        </div>
    )
}

export default MyCalendar