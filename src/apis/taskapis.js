import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getTaskList(task_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}task/list`, { task_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function addTask(task_id, task_title, task_cat, task_desc, task_due_date, task_status, task_tags, task_board, task_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}task/add`, { task_id, task_title, task_cat, task_desc, task_due_date, task_status, task_tags, task_board, task_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function getTaskById(task_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}task/get_by_id`, { task_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function delTaskById(task_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}task/delete`, { task_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}