import { useState, FormEvent, useEffect, useContext } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import useAppointmentService from "../../services/AppointmentServices";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";



import "./caform.scss";

interface IData {
	[name: string]: string
}

// Ограничить частоту выполнение ф-ии handleChange
function useDebounce(value: IAppointment, delay: number) {
	const [debounceValue, setDebounceValue] = useState(value);
	
	useEffect(() => {
		const handle = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(handle);
		}
	}, [value, delay]);

	return debounceValue;
}


function CAForm() {
const [formData, setFormData] = useState<IAppointment>({
	id: 1,
    date: "",
    name: "",
    service: "",
    phone: "",
    canceled: false
});

const [btnDisable, setBtnDisable] = useState<boolean>(false);

const { createNewAppointmentItem } = useAppointmentService();
const { getActiveAppointments } = useContext(AppointmentContext);
const debounceInput = useDebounce(formData, 300);

// POST запрос и обновление страницы
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	setBtnDisable(true);
	createNewAppointmentItem(formData)
		.then(() => {
			setBtnDisable(false);
			setFormData({
				id: 1,
				date: "",
				name: "",
				service: "",
				phone: "",
				canceled: false
			});
			getActiveAppointments(); 
		})
		.catch(() => {
			setBtnDisable(false);
			alert("Error occur within request");
		})
	
	const resetForm = e.target as HTMLFormElement;
    resetForm.reset();
}


useEffect(() => {
	handleChange();
	console.log(formData);

// eslint-disable-next-line react-hooks/exhaustive-deps
},[debounceInput]);

// Данные с input
const handleChange = () => {
  const el = document.querySelectorAll('input');
  el.forEach((element: HTMLInputElement) => {

      element?.addEventListener("change", (event) => {
		const target = event.currentTarget as HTMLInputElement; 
           if(target) {
			const prop = target.getAttribute('name');
			const inputData: IData = {
				[prop as string]: target.value,
			}
			setFormData((formData) => ({...formData, ...inputData}));
		   }
	  });
  });
}

	return (
		<form className="caform" onSubmit={handleSubmit} >
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				required
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
			/>
			<button disabled={btnDisable}>Create</button>
		</form>
	);
}

export default CAForm;
