import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getBoardList(board_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}board/list`, { board_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function addBoard(board_id, board_title, board_desc, board_status, board_by) {
    try {
        const response = await axios.post(`${apiBaseUrl}board/add`, { board_id, board_title, board_desc, board_status, board_by });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function getBoardById(board_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}board/get_by_id`, { board_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}

export async function deleteBoardById(board_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}board/delete`, { board_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}
