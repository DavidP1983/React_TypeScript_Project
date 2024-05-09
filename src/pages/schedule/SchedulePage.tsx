import AppointmentList from "../../components/appointmentList/AppointmentList";
import Calendar from "../../components/calendar/Calendar";
import CAForm from "../../components/createAppointmentForm/CAForm";
import ReloadButtom from "../../components/reloadButtom/ReloadButtom";

import "./schedulePage.scss";

function SchedulePage() {
	return (
		<section className="schedule">
			<div className="schedule__controls">
				<Calendar />
				<CAForm />
			</div>
			<div className="schedule__list">
				<AppointmentList />
				<ReloadButtom/>
			</div>
		</section>
	);
}

export default SchedulePage;
