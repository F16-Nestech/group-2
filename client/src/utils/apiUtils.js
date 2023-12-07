import axios from "axios";

const callCMSAPI = async (data) => {
    try {
        // Điền đường dẫn thực tế của API đăng ký trên CMS
        const response = await axios.post('', data)

        return response.data
    } catch (error) {
        console.error('Error calling CMS API: ', error)
        throw error
    }
}

module.exports = { callCMSAPI }
