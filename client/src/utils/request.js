import axios from "axios";

const request = async (url, method, data) => {
  try {
    const response = await axios({ url, method, data });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default request;
