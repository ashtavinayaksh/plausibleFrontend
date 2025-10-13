import axios from 'axios';
import { apiBaseUrl } from '@/apis/appconst';

// Get last conversation
export async function getLastConv(web_id,user_id) {
    try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("web_id", web_id);

        const response = await axios.post(`${apiBaseUrl}chat/get_last_conv`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Get conversations (paginated)
export async function getConvs(user_id, page_no) {
    try {
        const formData = new FormData();
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}chat/get_convs/${page_no}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Create new conversation immediately
export async function createConvNow(user_id, web_id) {
    try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("web_id", web_id);

        const response = await axios.post(`${apiBaseUrl}chat/create_conv_now`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Get messages for a conversation (paginated)
export async function getMsgs(conv_id, page_no, user_id) {
    try {
        const formData = new FormData();
        formData.append("conv_id", conv_id);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}chat/get_msgs/${page_no}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Send a message
export async function sendMsg(msg_conv, msg_txt,user_id) {
    try {
        const formData = new FormData();
        formData.append("msg_conv", msg_conv);
        formData.append("msg_txt", msg_txt);
        formData.append("user_id", user_id);

        const response = await axios.post(`${apiBaseUrl}chat/send_msg`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Get AI message response
export async function getAiMsg(msg_id, analytics_data) {
    try {
        const formData = new FormData();
        formData.append("msg_id", msg_id);
        formData.append("analytics_data", JSON.stringify(analytics_data));

        const response = await axios.post(`${apiBaseUrl}chat/get_ai_msg`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}

// Delete a conversation
export async function deleteChat(conv_id) {
    try {
        const response = await axios.post(`${apiBaseUrl}chat/delete_chat/${conv_id}`, null, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        return { status: false, type: "danger", message: "Request Failed" };
    }
}
