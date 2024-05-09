
import { IAppointment, TActiveAppointments } from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

import { TypeAction, TActionAppointments } from "./actions";
import { TStatusOptions } from "../../hooks/http.hook";

//state anotation
export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointmets: TActiveAppointments[] | [];
    calendarDate: LooseValue;
    status: TStatusOptions;
}



const reducer = (state: IAppointmentState, action: TActionAppointments): IAppointmentState => {
    switch (action.type) {
        case TypeAction.PROCESS_STATUS_FETCHING:
            return {
                ...state,
                status: "loading"
            }
        case TypeAction.ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload,
                status: "idle"
            }
        case TypeAction.ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointmets: action.payload,
                status: "idle"
            }
        case TypeAction.CALENDAR_DATE:
            return {
                ...state,
                calendarDate: action.payload,
            }
        case TypeAction.PROCESS_STATUS_ERROR:
            return {
                ...state,
                status: "error"
            }
        default: return state
    }
}

export default reducer;