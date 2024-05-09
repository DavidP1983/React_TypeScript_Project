import {useCallback, useContext, useEffect, useState} from 'react';
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import CancelModal from '../modal/CancelModal';
import setContent from '../../utils/setContent';
import {useLocation} from "react-router-dom";





function AppointmentList() {
	const { activeAppointmets, getActiveAppointments, status, calendarDate, getCalendarDate } = useContext(AppointmentContext);

	const [isOpen, setIsOpen] = useState(false);
	const [itemId, setItemId] = useState(0);
	const [zeroTimeLeft, setZeroTimeLeft] = useState<number | null>(null);
	const match = useLocation();

		useEffect(() => {

			if(match?.hash === "#/history") {
				getCalendarDate([null, null]);
			}
			match.hash = '';
			getActiveAppointments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[zeroTimeLeft, calendarDate]);

		const handleOpenModal = useCallback((id: number) => {
			setIsOpen(true);
			setItemId(id);
		},[]);



	
		const appointmentItemList = activeAppointmets.map((item) => {
			const {...itemProps} = item;
			return <AppointmentItem 
			key={item.id} 
			{...itemProps} 
			handleModalOpen={handleOpenModal}
			updateComponentOnTimeOff={setZeroTimeLeft}/>
		});



	return (
		<>
			{activeAppointmets.length ? setContent(status, appointmentItemList) : 
			<div style={{margin: "0 auto", fontWeight: 900}}>No appointments found at this request</div>}
			<CancelModal handleModalClose={setIsOpen} itemId={itemId} isOpen={isOpen}/>


			{/* {isOpen ? <CancelModal handleModalClose={setIsOpen} itemId={itemId}/> : null} */}
			{/* <AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem /> */}
		</>
	);
}

export default AppointmentList;
