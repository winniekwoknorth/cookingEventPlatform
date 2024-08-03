import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchOrganizationId = async () => {
  try {
    const response = await axios.get('/api/organizationId');
    return response.data.organizationId;
  } catch (error) {
    console.error('Error fetching organization ID:', error.message);
    throw error;
  }
};

export const listEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error listing events:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const listOrganizations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listOrganizations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching organizations:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const singleEvent = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    //console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching organizations:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createEvent = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const signupEvent = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const getEventCapacity = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}/capacity_tier`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error listing capacity:', error.response ? error.response.data : error.message);
    throw error;
  }
}
