import {useContext, useEffect} from 'react';
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";


 const ReloadButtom = () => {
    const { getActiveAppointments, status } = useContext(AppointmentContext);

        useEffect(() => {
            updateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        const updateList = () => {
            getActiveAppointments();
        }

    return (
        <>
            {status === 'error' ? <button onClick={updateList} className="schedule__reload" disabled={status === "error" ? false : true}>reload page</button> : null}
           
        </>
    )
}

export default ReloadButtom;