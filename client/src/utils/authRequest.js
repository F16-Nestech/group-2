import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const request = async (url, method, data) => {
  try {
    const response = await axios({ url, method, data });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default request;