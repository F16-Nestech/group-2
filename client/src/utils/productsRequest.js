import axios from "axios";

const BASEURL = process.env.BASE_URL;
const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api/v1/products",
});
const getAllProducts = async (filters) => {
  try {
    const response = await axiosInstance.get("/list", { params: filters });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const getProduct = async (productId) => {
  try {
    const response = await axiosInstance.get(`/read-Product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(`/products`, productData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateProduct = async (productId, updatedProductData) => {
  try {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      updatedProductData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllProducts, createProduct, updateProduct, deleteProduct,getProduct };
