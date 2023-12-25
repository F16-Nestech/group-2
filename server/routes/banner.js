import express from 'express';
import Banner from '../models/bannerModel';

const router = express.Router();

const validateBanner = (req, res) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin banner' });
  }
};

// Tạo banner mới
router.post('/banners', validateBanner, async (req, res) => {
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
});

// Cập nhật thông tin của một banner
router.put('/banners/:id', validateBanner, async (req, res) => {
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
});

// Xóa banner
router.delete('/banners/:id', async (req, res) => {
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
});

// Lấy danh sách các banner
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ deleted: { $ne: true } });
    res.status(200).json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách banner' });
  }
});

export default router;
