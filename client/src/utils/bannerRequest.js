import axios from 'axios';

const BASEURL = process.env.BASE_URL
const axiosInstance = axios.create({
  baseURL: BASEURL,
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
  const response = await axiosInstance.post('/banners', bannerData);
  return response.data;
} catch (error) {
  if (error.response) {
    console.error('Lỗi phản hồi:', error.response.data);
    throw error.response.data; 
  } else if (error.request) {
    console.error('Không có phản hồi nhận được:', error.request);
    throw 'Không có phản hồi nhận được'; 
  } else {
    console.error('Lỗi thiết lập yêu cầu:', error.message);
    throw 'Lỗi thiết lập yêu cầu'; 
  }
}
};

const updateBanner = async (bannerId, updatedBannerData) => {
  try {
    const response = await axiosInstance.put(`/banners/${bannerId}`, updatedBannerData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Lỗi phản hồi:', error.response.data);
      throw error.response.data; 
    } else if (error.request) {
      console.error('Không có phản hồi nhận được:', error.request);
      throw 'Không có phản hồi nhận được'; 
    } else {
      console.error('Lỗi thiết lập yêu cầu:', error.message);
      throw 'Lỗi thiết lập yêu cầu'; 
    }
  }
};

const deleteBanner = async (bannerId) => {
  try {
    const response = await axiosInstance.delete(`/banners/${bannerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Lỗi phản hồi:', error.response.data);
      throw error.response.data; 
    } else if (error.request) {
      console.error('Không có phản hồi nhận được:', error.request);
      throw 'Không có phản hồi nhận được'; 
    } else {
      console.error('Lỗi thiết lập yêu cầu:', error.message);
      throw 'Lỗi thiết lập yêu cầu'; 
    }
  }
};

export {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner
};
