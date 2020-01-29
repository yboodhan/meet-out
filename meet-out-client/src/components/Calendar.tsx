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

import { TMeets } from './Content'

interface CalendarProps {
    allMeets: TMeets[]
}


const MyCalendar: React.FC<CalendarProps> = (props) => {

    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment);
    
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