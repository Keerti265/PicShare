// src/utils/api.js

import axios from 'axios';

export async function fetchPictures() {
  try {
    const response = await axios.get('http://localhost:5000/api/pictures');
    return response.data;
  } catch (error) {
    console.error('Error fetching pictures:', error);
    throw error; // Rethrow the error if you want to handle it elsewhere
  }
}
