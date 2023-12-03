import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const getAllProducts = async (filters) => {
  try {
    const response = await axiosInstance.get('/products', { params: filters });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; 
    } else {
      throw new Error('Something went wrong'); 
    }
  }
};

const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateProduct = async (productId, updatedProductData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, updatedProductData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export { getAllProducts, createProduct, updateProduct, deleteProduct };