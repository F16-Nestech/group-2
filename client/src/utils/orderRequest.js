import axios from "axios";

const BASEURL = process.env.BASE_URL;
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/orders",
});
const createOrder = async (orderData) => {
  try {
      const response = await axios.post(`${apiUrl}/createOrder`, orderData);
      return response.data;
  } catch (error) {
      console.error('Error creating order:', error);
      throw error;
  }
};

export { createOrder };