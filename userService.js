import axios from 'axios';

const API_URL = '/api/users'; // Adjust this based on your backend API path

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};