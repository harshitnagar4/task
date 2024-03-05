import axios from 'axios';
const BASE_URL = 'https://api.nationalize.io';

export const fetchNationalizeData = async (names) => {
  try {
    const nameData = names.split(',').map((name) => encodeURIComponent(name.trim()));
    const queryString = nameData.map((name) => `name[]=${name}`).join('&');
    const response = await axios.get(`${BASE_URL}/?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Fetching Error', error);
    throw error;
  }
};
