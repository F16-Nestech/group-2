import axios from "axios";

export const callCMSAPI = async (data) => {
    try {
        // Điền đường dẫn thực tế của API đăng ký trên CMS
        const response = await axios.post('http://your_backend_url_server.com/', data)

        return response.data
    } catch (error) {
        console.error('Error calling CMS API: ', error)
        throw error
    }
}
