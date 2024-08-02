import axios from 'axios';

const API_BASE_URL = '/api';


export const getSignups = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signups`, data);
    return response.data;
  } catch (error) {
    console.error('Error getting:', error.response ? error.response.data : error.message);
    throw error;
  }
};
