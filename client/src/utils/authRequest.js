import axios from 'axios';

const BASEURL = process.env.BASE_URL
const axiosInstance = axios.create({
  baseURL: BASEURL,
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