import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';

export async function getList(page_no, limit,form_temp_by,form_temp_status) {
    try {
        const response = await axios.post(`${apiBaseUrl}form_tmp/list`, { page_no, limit,form_temp_by,form_temp_status });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
}


export async function addItem(form_temp_id,file, form_temp_title, form_temp_desc, form_temp_fields, form_temp_status, form_temp_by) {
    try {
   
        const formData = new FormData();
        formData.append('form_temp_image', file); 
        formData.append('form_temp_id', form_temp_id);
        formData.append('form_temp_title',  form_temp_title);
        formData.append('form_temp_desc',form_temp_desc);
        formData.append('form_temp_fields', form_temp_fields);
        formData.append('form_temp_status', form_temp_status);
        formData.append('form_temp_by', form_temp_by);
        const response = await axios.post(`${apiBaseUrl}form_tmp/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Let Axios set the correct content type for FormData
            },
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

export async function getItemById(form_temp_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}form_tmp/get_by_id`, { form_temp_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }

}

export async function delItemById(form_temp_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}form_tmp/delete`, { form_temp_id });
        return response.data;
    } catch (error) {
        return {
            status: false,
            type: "danger",
            message: "Authentication Failed"
        };
    }
    
}