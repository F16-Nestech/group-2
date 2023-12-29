import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const getAllBanners = async () => {
  try {
    const response = await axiosInstance.get('/banners');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; 
    } else {
      throw new Error('Something went wrong'); 
    }
  }
};

const createBanner = async (bannerData) => {
  try {
    const response = await axiosInstance.post(`/banners`, bannerData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateBanner = async (bannerId, updatedBannerData) => {
  try {
    const response = await axiosInstance.put(`/banners/${bannerId}`, updatedBannerData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteBanner = async (bannerId) => {
  try {
    const response = await axiosInstance.delete(`/banners/${bannerId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner
};
