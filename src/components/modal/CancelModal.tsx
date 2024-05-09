import { useRef, KeyboardEvent, useEffect, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../portal/Portal";
import useAppointmentService from "../../services/AppointmentServices";
import  {AppointmentContext} from "../../context/appointments/AppointmentsContext";

import "./modal.scss";

export interface IMessageContent {
	name: string;
	updateAt: string;
}

interface IModalProps {
	handleModalClose: (state: boolean) => void;
	itemId: number;
	isOpen: boolean;
}

type Key = Pick<KeyboardEvent, 'code'>;


function CancelModal({ handleModalClose, itemId, isOpen }: IModalProps) {
	const {canceledAppointmentItem} = useAppointmentService();
	const {getActiveAppointments} = useContext(AppointmentContext);

	const [btnDisable, setBtnDisable] = useState(false); // отвечает за блокирование кнопки
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null); // отвечает за показ сообщения и re-rendre
	const [canceledMessage, setCanceledMassege] = useState<IMessageContent | null>(null); // показ сообщение клиенту об отмене appointment
	const [controlMessage, setControlMessage ] = useState<boolean | null>(null); // отвечает за очищение окна от сообщений при любых обстоятельствах

	const nodeRef = useRef<HTMLDivElement>(null);

// Запрос на отмену appointmentItem
const handleCancelAppointment = (id: number) => {
	setBtnDisable(true);
	canceledAppointmentItem(id)
	.then((data) => {
		setCanceledMassege(data);
		setControlMessage(false); // для того, чтоб сообщение показалось
		setCancelStatus(true);
	})
	.catch(() => {
		setControlMessage(false);
		setCancelStatus(false);
	})
}

// Закрытие модального окна и обновление компонента
const closeModal = () => {
	handleModalClose(false);
	setControlMessage(null);   // стерли сообщение
	setBtnDisable(false);     
	if(cancelStatus) {
		getActiveAppointments();
		setCancelStatus(null);
	}
}

//Закрытие окна при помощи  "Escape"
	const handleKeyboardEvent = (e: Key) => {
		if(e.code === "Escape") {
			closeModal();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyboardEvent);

		return () => {
			document.removeEventListener("keydown", handleKeyboardEvent);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[cancelStatus]);


	return (

		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{enter: 300, exit: 300}}
				classNames="modal"
				mountOnEnter
				unmountOnExit
				nodeRef={nodeRef}>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? #{itemId}
						</span>
						<div className="modal__btns">
							<button className="modal__ok" 
							onClick={() => handleCancelAppointment(itemId)} 
							disabled={btnDisable}>Ok</button>
							<button className="modal__close" 
							onClick={closeModal}>Close</button>
						</div>
						{controlMessage === null 
						? "" 
						: cancelStatus 
						? <div className="modal__status">Success<br/><strong>Mrs./Ms {canceledMessage?.name} your appointment has been deleted at {canceledMessage?.updateAt}</strong></div> 
						: <div className="modal__error" style={{marginTop: 10}}>Error, please close the window and try again</div>}


						{/* {message ? <div className="modal__status">Success <br/><strong>Mrs./Ms {message.name} your appointment has been deleted at {message.updateAt}</strong></div> : null} */}
					</div>
				</div>
			</CSSTransition>
		</Portal>


	);
}

export default CancelModal;
