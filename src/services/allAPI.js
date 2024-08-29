import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";


export const registerAPI = async (reqBody) => {
    try {
        const response = await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
        return response; 
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const loginAPI = async (reqBody) => {
    try {
        const response = await commonAPI('POST', `${SERVER_URL}/login`, reqBody);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred');
    }
};

export const getUsersAPI = async () => {
    try {
        const response = await commonAPI("GET", `${SERVER_URL}/users`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


