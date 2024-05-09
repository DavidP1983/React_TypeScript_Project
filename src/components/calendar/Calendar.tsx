import { useContext } from 'react';
import { AppointmentContext } from '../../context/appointments/AppointmentsContext';
import {Calendar as LibCalendar} from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import "./calendar.scss";

function Calendar() {
	const {calendarDate, getCalendarDate} = useContext(AppointmentContext);
console.log(calendarDate);
	return (
		<div className="calendar">
			<LibCalendar value={calendarDate} onChange={getCalendarDate}  selectRange/>
		</div>
	)
}

export default Calendar;
