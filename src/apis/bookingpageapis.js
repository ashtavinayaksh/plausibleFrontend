import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';
export async function getBookingList(page_no, limit, web_user) {
    try {
        const formData = new FormData();
        formData.append("page_no", page_no);
        formData.append("limit", limit);
        formData.append("web_user", web_user);

        const response = await axios.post(`${apiBaseUrl}website/get_web_list`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
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

export async function addBooking(web_id,web_link,web_script,web_timezone,web_user) {
    try {
        const formData = new FormData();
        formData.append("web_id", web_id);
        formData.append("web_link", web_link);
        formData.append("web_script", web_script);
        formData.append("web_timezone", web_timezone);
        formData.append("web_user", web_user);

        const response = await axios.post(`${apiBaseUrl}website/create_web_now`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
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

export async function getBookingById(web_id) {
    try {
        const formData = new FormData();
        formData.append("web_id", web_id);

        const response = await axios.post(`${apiBaseUrl}website/get_web_by_id`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
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

export async function getWebReport(web_id,filter_val) {
    try {
        const formData = new FormData();
        formData.append("web_id", web_id);
        formData.append("filter_val", filter_val);

        const response = await axios.post(`${apiBaseUrl}ana_report/get_ana_report`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
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

export async function deleteBookingById(web_id) {
    try {
        const formData = new FormData();
        formData.append("web_id", web_id);

        const response = await axios.post(`${apiBaseUrl}website/del_web`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
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
