import axios from "axios";

const BASEURL = process.env.BASE_URL;
const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api/v1/cartItems",
});

const getAllItems = async () => {
  try {
    const response = await axiosInstance.get("/items");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong");
    }
  }
};
const addItemToCart = async (itemData) => {
  try {
    const response = await axiosInstance.post("/add", itemData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const removeItemFromCart = async (itemId) => {
  try {
    const response = await axiosInstance.delete(`/delete/${itemId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export { getAllItems, addItemToCart, removeItemFromCart };
