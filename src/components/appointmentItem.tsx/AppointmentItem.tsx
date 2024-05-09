import { useState, useEffect, memo } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

import dayjs from "dayjs";
import { Optional } from 'utility-types';

import "./appointmentItem.scss";

// type Optinal<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
// type AppointmentProps = Optinal<IAppointment, "canceled">;
type AppointmentProps = Optional<IAppointment, "canceled"> & Partial<{
	handleModalOpen: (id: number) => void,
	updateComponentOnTimeOff: (time: number) => void
}>;



const AppointmentItem = memo(({ date, name, service, phone, canceled, handleModalOpen, id, updateComponentOnTimeOff }: AppointmentProps) => {
	const [timeLeft, changeTimeLeft] = useState<string | null>(null);

	// const  appointmentDate: string = new Date(date).toLocaleDateString('en-GB');
	// const formatter: string = new Intl.DateTimeFormat("de-De", {hour: '2-digit', minute: '2-digit'}).format(new Date(date));
	const formatterDate = dayjs(date).format("DD/MM/YYYY HH:mm");

	useEffect(() => {
		const timer = setInterval(startTimer, 60000);
		startTimer();

		function startTimer() {
			if((dayjs(date).diff(undefined, "minutes") <= 0)) {
				console.log("time");
				changeTimeLeft(`00:00`);	
				if(updateComponentOnTimeOff) {
					updateComponentOnTimeOff(id);
				}
				clearInterval(timer);
			}else {
				let hours = getLeadingZero(dayjs(date).diff(undefined, 'h'));
				let munites = getLeadingZero(dayjs(date).diff(undefined, 'm') % 60);
				changeTimeLeft(`${hours}:${munites}`);	
			}
	
		}
	
		return () => {
			clearInterval(timer);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);


	function getLeadingZero(num: number) {
		return num >= 0 && num < 10 ? `0${num}` : num;
	}



	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formatterDate} </span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			{!canceled && handleModalOpen ? (
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button className="appointment__cancel" onClick={() => {
						if(handleModalOpen) {
							handleModalOpen(id)
						}
					}
						}>Cancel</button>
				</>
			) : null}
			{canceled ? <div className="appointment__canceled">Canceled</div> : null}
		</div>
	);
});


export default AppointmentItem;



// function AppointmentItem({date, name, service, phone}: TActiveAppointments) {
// 	return (
// 		<div className="appointment">
// 			<div className="appointment__info">
// 				<span className="appointment__date">Date: DD/MM/YYYY HH:mm</span>
// 				<span className="appointment__name">Name: Alex Smith</span>
// 				<span className="appointment__service">Service: Manicure</span>
// 				<span className="appointment__phone">Phone: +1 948 945 344</span>
// 			</div>
// 			<div className="appointment__time">
// 				<span>Time left:</span>
// 				<span className="appointment__timer">HH:mm</span>
// 			</div>
// 			<button className="appointment__cancel">Cancel</button>
// 			{/* <div className="appointment__canceled">Canceled</div> */}
// 		</div>
// 	);
// }

// export default AppointmentItem;
