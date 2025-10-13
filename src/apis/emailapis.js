import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getList(page_no, limit,mail_tmp_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}mail_tmp/list`, { page_no, limit,mail_tmp_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}


export async function addItem(mail_tmp_id, mail_tmp_subject, mail_tmp_body, mail_tmp_when_it_will_send, mail_tmp_when_it_will_send1, mail_tmp_status, mail_tmp_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}mail_tmp/add`, { mail_tmp_id, mail_tmp_subject, mail_tmp_body, mail_tmp_when_it_will_send, mail_tmp_when_it_will_send1, mail_tmp_status, mail_tmp_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function getItemById(mail_tmp_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}mail_tmp/get_by_id`, { mail_tmp_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }

}

export async function delItemById(mail_tmp_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}mail_tmp/delete`, { mail_tmp_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
    
}