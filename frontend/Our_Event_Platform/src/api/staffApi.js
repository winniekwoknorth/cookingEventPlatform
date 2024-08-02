import axios from 'axios';

const API_BASE_URL = '/api';


export const checkStaffList = async (data) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/staff`, data);

    return response.data;
  } catch (error) {
    console.error('Error checking staff list:', error.response ? error.response.data : error.message);
    throw error;
  }
};
