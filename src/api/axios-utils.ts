import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.realworld.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosClient.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('jwt')}`;
