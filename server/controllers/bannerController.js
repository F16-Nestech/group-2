const { default: mongoose } = require('mongoose');
import Banner from '../models/bannerModel';

const bannerController = {
    validateBanner : async (req, res) => {
        const { title, imageUrl } = req.body;
      
        if (!title || !imageUrl) {
          return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin banner' });
        }
    },
      
    //Add Banner
    createBanner: async (req, res) => {
        try {
            const { title, imageUrl } = req.body;
        
            const existingBannerByTitle = await Banner.findOne({ title });
            if (existingBannerByTitle) {
              return res.status(400).json({ message: 'Banner đã tồn tại dựa trên tiêu đề' });
            }
        
            const newBanner = new Banner({ title, imageUrl });
            await newBanner.save();
        
            res.status(201).json({ message: 'Banner đã được tạo thành công', banner: newBanner });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi tạo banner' });
          }
    },


    //Get all Banner
    getBanner: async (req, res) => {
        console.log('get all Banner');
        try {
            const banners = await Banner.find({ deleted: { $ne: true } });
            res.status(200).json({ banners });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy danh sách banner' });
          }
    },
    //Update Banner
    updateBanner: async (req, res) => {
        console.log('update Banner');
        try {
            const bannerId = req.params.id;
            const { title, imageUrl } = req.body;
        
            const updatedBanner = await Banner.findByIdAndUpdate(
              bannerId,
              { title, imageUrl },
            );
            if (!updatedBanner) {
              return res.status(404).json({ message: 'Không tìm thấy banner để cập nhật' });
            }
        
            res.status(200).json({ message: 'Banner đã được cập nhật', banner: updatedBanner });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi cập nhật banner' });
          }
    },


    //Delete Banner
    deleteBanner: async (req, res) => {
        try {
            const bannerId = req.params.id;
        
            const softDeleteBanner = await Banner.findByIdAndUpdate(
              bannerId,
              { deleted: true },
              { new: true }
            );
        
            if (!softDeleteBanner) {
              return res.status(404).json({ message: 'Không tìm thấy banner để xóa' });
            }
        
            res.status(200).json({ message: 'Banner đã được xóa', banner: softDeleteBanner });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi xóa banner' });
          }
    },

    //Delete Many Banner
    deleteManyBanner: async (req, res) => {

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const ids = req.body
            if (!ids || Array.isArray(ids) || ids.length === 0) {
                throw new Error('Invalid ids');
            }

            const result = await Banner.deleteMany({ _id: { $in: ids } }).session(session);

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                success: true,
                result,
                message: 'Delete products successfully!'
            })

        } catch (err) {
            await session.abortTransaction();
            session.endSession();

            return res.status(500).json({
                success: false,
                result: null,
                message: err.message || 'server err',
            });
        }
    },
};

module.exports = bannerController;

