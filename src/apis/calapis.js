import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function createMeetOnGoogle(user_id,appointment_id, customer_name, customer_email, address,
     details, start, end, timeZone) {
    try {
        const response = await axios.post(`${apiBaseUrl}google/create-event`, { user_id,appointment_id, customer_name, customer_email, address, details, start, end, timeZone });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}