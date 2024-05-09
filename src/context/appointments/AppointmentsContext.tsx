
import React, { useReducer, createContext } from "react";
import reducer, { IAppointmentState } from "./reducer";
import {TypeAction} from './actions';
import { Value } from "react-calendar/dist/cjs/shared/types";
import useAppointmentService from "../../services/AppointmentServices";


const appointmentSate: IAppointmentState = {
    allAppointments: [],
    activeAppointmets: [],
    calendarDate: [null, null],
    status: "idle"
}

interface IContext extends IAppointmentState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
    getCalendarDate: (newData: Value) => void;

}

// Context
export const AppointmentContext = createContext<IContext>({
    allAppointments: appointmentSate.allAppointments,
    activeAppointmets: appointmentSate.activeAppointmets,
    calendarDate: appointmentSate.calendarDate,
    status: appointmentSate.status,
    getAppointments: () => {},
    getActiveAppointments: () => {},
    getCalendarDate: () => {}
});

interface ProviderProps {
    children: React.ReactNode
}

const AppointmentsContextProvider = ({children}: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, appointmentSate);
    const { getAllAppointments, getAllActiveAppointments, process } = useAppointmentService();

    const value: IContext = {
        allAppointments: [...state.allAppointments].sort((a, b):number => {
            if(new Date(a.date) > new Date(b.date)) return 1
            if(new Date(a.date) < new Date(b.date)) return -1
            return 0
        }),
        activeAppointmets: state.activeAppointmets,
        calendarDate: state.calendarDate,
        status: process,
        getAppointments: () => {
            getAllAppointments()
                .then((data) => {
                    // eslint-disable-next-line array-callback-return
                    const filterData = data.filter((item) => {
                        if(Array.isArray(state.calendarDate) && 
                        state.calendarDate[0] && 
                        state.calendarDate[1]) 
                        {
                            if(new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() 
                            && new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()) {
                                return item;
                            }
                        }else {
                            return item;
                        }
                    });
                    dispatch({type: TypeAction.ALL_APPOINTMENTS, payload: filterData});   
                })
                .catch(() => dispatch({type: TypeAction.PROCESS_STATUS_ERROR}));
        },
        getActiveAppointments: () => {
            getAllActiveAppointments()
                .then((data) => {
                    // eslint-disable-next-line array-callback-return
                    const filterData = data.filter((item) => {
                        if(Array.isArray(state.calendarDate) && 
                        state.calendarDate[0] && 
                        state.calendarDate[1]) 
                        {
                            if(new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() 
                            && new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()) {
                                return item;
                            }
                        }else {
                            return item;
                        }
                    });
                    dispatch({type: TypeAction.ACTIVE_APPOINTMENTS, payload: filterData});
                })
                .catch(() => dispatch({type: TypeAction.PROCESS_STATUS_ERROR}));
        },
        getCalendarDate: (newDate: Value) =>  dispatch({type: TypeAction.CALENDAR_DATE, payload: newDate})
    }

        return (
            <AppointmentContext.Provider value={value}>
                {children}
            </AppointmentContext.Provider>
        )
}

export default AppointmentsContextProvider;
