
import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequeredFields";
import { IAppointment, TActiveAppointments } from "../shared/interfaces/appointment.interface";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {

    const { process, request } = useHttp();
    const _apiBase = "  http://localhost:3001/appointments";

    // All propertys
    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({ url: _apiBase });  // appointments: [{}] c db

        if (res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))) {
            return res;
        } else {
            throw new Error('Data doest contien all required fields');
        }
    };

    // no canceled  property 
    // type TActiveAppointments = Omit<IAppointment, "canceled">
    const getAllActiveAppointments = async () => {

        const base = await getAllAppointments(); // Чтобы не дублировать проверки, используем первый запрос и возвращаем объект, но уже без одного св-ва  "canceled" 
        // Фильтруем только canceled = false и те, у которых время еще не истекло, т.е. активные записи 
        const transformed: TActiveAppointments[] = base.filter((item) => {
            return !item.canceled && dayjs(item.date).diff(undefined, "minutes") > 0;
        }).map((item) => {
            return {
                id: item.id,
                date: item.date,
                name: item.name,
                service: item.service,
                phone: item.phone
            }
        });

        return transformed;
    };

    const canceledAppointmentItem = async (id: number) => {

        return await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify({ canceled: true, updateAt: new Date().toLocaleString('en-US', { timeZoneName: 'short' }).slice(0, -9) })
        })
    }

    const createNewAppointmentItem = async (data: IAppointment) => {
        const id = performance.now();
        data['id'] = id;
        // data["date"] = data.date.replace(/\//g, " ").split(' ').reverse().join(' ');
        data["date"] = dayjs(data.date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm");
        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(data)
        })
    }


    return { process, getAllAppointments, getAllActiveAppointments, canceledAppointmentItem, createNewAppointmentItem }
};

export default useAppointmentService;