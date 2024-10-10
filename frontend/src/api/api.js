import axios from 'axios';

const apiUrl = 'https://jzij6pictl.execute-api.us-east-1.amazonaws.com/Prod'; 

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${apiUrl}/createUser`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/getALLUsers`);
        return response.data.data;
    } catch (error) {
        // Improved error handling
        if (error.response) {
            console.error('Error fetching users:', error.response.data);
        } else if (error.request) {
            console.error('Error fetching users: No response received', error.request);
        } else {
            console.error('Error fetching users:', error.message);
        }
        throw error;
    }
};



