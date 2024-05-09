
import { IAppointment, TActiveAppointments } from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

// Created for Actions anotation

// type_action
export enum TypeAction {
    ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    PROCESS_STATUS_FETCHING = "STATUS_FETCHING",
    PROCESS_STATUS_ERROR = "STATUS_FETCHING_ERROR",
    CALENDAR_DATE = "SET_CALENDAR_DATE"
}

// action anotation
export type TActionAppointments = {
    type: TypeAction.ALL_APPOINTMENTS, payload: IAppointment[]
} | {
    type: TypeAction.ACTIVE_APPOINTMENTS, payload: TActiveAppointments[]
} | { type: TypeAction.PROCESS_STATUS_FETCHING }
    | { type: TypeAction.PROCESS_STATUS_ERROR }
    | { type: TypeAction.CALENDAR_DATE, payload: LooseValue }