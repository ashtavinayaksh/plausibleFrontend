import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getAppointmentList(page_no, limit, appointment_vendor,appointment_mode,appointment_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/list`, { page_no, limit, appointment_vendor,appointment_mode,appointment_status });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
export async function getAppointmentList2(page_no, limit, appointment_vendor,appointment_status,appointment_pay_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/list`, { page_no, limit, appointment_vendor
            ,appointment_status,appointment_pay_status });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
export async function getAppointmentReport(appointment_vendor) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/report`, { appointment_vendor});
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
export async function getAppointmentList1(appointment_vendor, appointment_date,appointment_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/list1`, { appointment_vendor,appointment_date,appointment_status });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function addAppointment(appointment_id, appointment_page,appointment_page_title,
    appointment_mode, appointment_vendor, appointment_customer_name, appointment_customer_email, 
    appointment_customer_contact, appointment_slot, appointment_date, appointment_meet, 
    appointment_status, appointment_payment_status, appointment_amt, appointment_pay_type, appointment_guests, appointment_datetime) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/add`, {
            appointment_id, appointment_page,appointment_page_title,appointment_mode, appointment_vendor, appointment_customer_name, appointment_customer_email
            , appointment_customer_contact, appointment_slot, appointment_date, appointment_meet, 
            appointment_status, appointment_payment_status, appointment_amt, appointment_pay_type,appointment_guests, appointment_datetime
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function upAppStatus(appointment_id, appointment_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/status_update`, {
            appointment_id, appointment_status
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}


export async function upAppStatus1(appointment_id, appointment_payment_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/status_update1`, {
            appointment_id, appointment_payment_status
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function getAppointmentById(appointment_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/get_by_id`, { appointment_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
export async function getAppointmentBySlot(appointment_date,appointment_slot) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/get_by_slot`, { appointment_date,appointment_slot });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function delAppointmentById(appointment_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}appoint/delete`, { appointment_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
