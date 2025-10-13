import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getList(page_no, limit, package_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}pkg/list`, { page_no, limit, package_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function addItem(package_id, package_name, package_amount, package_desc, package_status, package_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}pkg/add`, { package_id, package_name, package_amount, package_desc, package_status, package_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function getItemById(package_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}pkg/get_by_id`, { package_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function delItemById(package_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}pkg/delete`, { package_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}