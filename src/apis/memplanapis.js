import axios from 'axios';
import { apiBaseUrl } from '@/apis/appconst';

export async function getPlanList(page_no, limit,user_id) {
    try {
        const formData = new FormData();
        formData.append("page_no", page_no);
        formData.append("limit", limit);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}plan/get_plan_list`, formData, {
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

export async function getPlanList1(page_no, limit, plan_type,user_id) {
    try {
        const formData = new FormData();
        formData.append("page_no", page_no);
        formData.append("limit", limit);
        formData.append("plan_type", plan_type);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}plan/get_plan_list`, formData, {
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


export async function addPlan(
    plan_id, plan_title, plan_price, plan_duration, plan_desc, plan_img, plan_type,
    plan_client, plan_inv, plan_curr, plan_features
) {
    try {
        const formData = new FormData();
        formData.append("plan_id", plan_id);
        formData.append("plan_title", plan_title);
        formData.append("plan_price", plan_price);
        formData.append("plan_duration", plan_duration);
        formData.append("plan_desc", plan_desc);
        formData.append("plan_img", plan_img); // must be File/Blob for upload
        formData.append("plan_type", plan_type);
        formData.append("plan_client", plan_client);
        formData.append("plan_inv", plan_inv);
        formData.append("plan_curr", plan_curr);
        formData.append("plan_features", plan_features);

        const response = await axios.post(`${apiBaseUrl}plan/create_plan_now`, formData, {
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
export async function getPlanById(plan_id) {
    try {
        const formData = new FormData();
        formData.append("plan_id", plan_id);

        const response = await axios.post(`${apiBaseUrl}plan/get_plan_by_id`, formData, {
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

export async function deletePlanById(plan_id) {
    try {
        const formData = new FormData();
        formData.append("plan_id", plan_id);

        const response = await axios.post(`${apiBaseUrl}plan/del_plan`, formData, {
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

