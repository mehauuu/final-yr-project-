import axios from 'axios';

const API_URL = '/api/shipments'; // Adjust based on your actual API route

export const getShipments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw error;
  }
};

export const addShipment = async (shipment) => {
  try {
    const response = await axios.post(API_URL, shipment);
    return response.data;
  } catch (error) {
    console.error('Error adding shipment:', error);
    throw error;
  }
};

export const updateShipment = async (id, updatedShipment) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedShipment);
    return response.data;
  } catch (error) {
    console.error('Error updating shipment:', error);
    throw error;
  }
};

export const deleteShipment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting shipment:', error);
    throw error;
  }
};

export const getShipmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipment by ID:', error);
    throw error;
  }
};

// If you need to fetch shipments with a custom query (like filtering by status or date range)
export const getShipmentsWithQuery = async (queryParams) => {
  try {
    const response = await axios.get(API_URL, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching shipments with query:', error);
    throw error;
  }
};