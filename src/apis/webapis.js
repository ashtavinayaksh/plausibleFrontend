import axios from 'axios';

import { apiBaseUrl } from '@/apis/appconst';


export async function loginUser(email, password) {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.post(`${apiBaseUrl}admin_apis/login_now`, formData, {
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

export async function checkWebUrl(url) {
    try {
        const formData = new FormData();
        
        const response = await axios.get(`${url}`, formData, {
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

export async function getMyDt(user_id) {
    try {
        const formData = new FormData();
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}admin_apis/get_user_dt`, formData, {
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



export async function chPassNow(old_pass, new_pass, user_id) {
    try {
        const formData = new FormData();
        formData.append("old_pass", old_pass);
        formData.append("new_pass", new_pass);
        formData.append("new_pass1", new_pass);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}admin_apis/change_pass_now`, formData, {
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

export async function regUser(name, email,mobile, password) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("mobile", mobile);

        const response = await axios.post(`${apiBaseUrl}admin_apis/register_now`, formData, {
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

export async function frogotUser(email) {
    try {
        const formData = new FormData();
        formData.append("email", email);

        const response = await axios.post(`${apiBaseUrl}admin_apis/forgot_now`, formData, {
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

export async function getUsrList(page_no, limit, type, rtype) {
    try {
        const formData = new FormData();
        formData.append("page_no", page_no);
        formData.append("limit", limit);
        formData.append("type", type);
        formData.append("rtype", rtype);

        const response = await axios.post(`${apiBaseUrl}admin_apis/get_users`, formData, {
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

export async function getNotiList(page_no, limit, noti_user) {
    try {
        const formData = new FormData();
        formData.append("page_no", page_no);
        formData.append("limit", limit);
        formData.append("noti_user", noti_user);

        const response = await axios.post(`${apiBaseUrl}admin_apis/get_noties`, formData, {
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

export async function purPlan(
    plan_id,
    user_id
) {
    try {
        const formData = new FormData();
        formData.append("plan_id", plan_id);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}admin_apis/purchase_plan`, formData, {
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
