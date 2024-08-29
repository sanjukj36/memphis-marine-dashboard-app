import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    };
    try {
        const response = await axios(reqConfig);
        return response;
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An error occurred');
    }
};
