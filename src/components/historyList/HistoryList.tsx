import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import setContent from "../../utils/setContent";
import {useLocation} from "react-router-dom";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

function HistoryList() {
	const {allAppointments, getAppointments, status, getCalendarDate, calendarDate} = useContext(AppointmentContext);
	const match = useLocation();

	useEffect(() => {
		if(match?.hash ===  "#/schedule") {
			getCalendarDate([null, null]);
		}
		match.hash = '';
		getAppointments();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[calendarDate]);
	
	const allAppointmentItemList = allAppointments.map((item) => {
		return <AppointmentItem key={item.id} {...item}/>
	});

	return (
		<>
		{allAppointmentItemList.length ? setContent(status, allAppointmentItemList) :
		<div style={{position: "absolute", inset: "0 18%", fontWeight: 900}}>No appointments found at this request</div>}
			{/* <AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem /> */}
		</>
	);
}

export default HistoryList;
