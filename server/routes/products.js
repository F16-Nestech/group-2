import express from 'express'
import Product from '../models/productModel';
const router = express.Router()

const validateProduct = (req, res) => {
  const { name, price, content, discount, image_link, image_list } = req.body;

  if (!name || !price || !image_link) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin sản phẩm' });
  }

  if (isNaN(price) || (discount && isNaN(discount))) {
      return res.status(400).json({ message: 'Giá sản phẩm và giảm giá phải là số' });
  }
  if (content && typeof content !== 'string') {
    return res.status(400).json({ message: 'Nội dung sản phẩm phải là chuỗi' });
  }
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Các đuôi file hình ảnh phổ biến
  const hasValidExtension = imageExtensions.some(ext => image_link.toLowerCase().endsWith(ext));
  if (!hasValidExtension) {
    return res.status(400).json({ message: 'Đường dẫn ảnh không hợp lệ' });
  }
  if(image_list){
    if (!Array.isArray(image_list)) {
      return res.status(400).json({ message: 'list ảnh phải là một tập ảnh hợp lệ ' });
    }

    const isValidImageList = image_list.every(img => {
        const isValidImage = imageExtensions.some(ext => img.toLowerCase().endsWith(ext));
        return isValidImage;
    });

    if (!isValidImageList) {
        return res.status(400).json({ message: ' các đường dẫn hình ảnh phải hợp lệ' });
    }
  }
};
// Tạo sản phẩm
router.post('/products',validateProduct,async (req, res) => {
      try {
      const { name, price, content, discount, image_link, image_list } = req.body;
      const existingProductByName = await Product.findOne({ name });
      if (existingProductByName) {
        return res.status(400).json({ message: 'Sản phẩm đã tồn tại dựa trên tên' });
      }
      const newProduct = new Product({
        name,
        price,
        content,
        discount,
        image_link,
        image_list,
      });

      await newProduct.save();

      res.status(201).json({ message: 'Sản phẩm đã được tạo thành công', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm' });
    }
  });

// Chỉnh sửa sản phẩm
router.put('/products/:id',validateProduct, async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, content, discount, image_link, image_list } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        content,
        discount,
        image_link,
        image_list,
        updated: Date.now(),
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được cập nhật', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm' });
  }
});

// Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const softDeleteProduct = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      { new: true }
    );

    if (!softDeleteProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
    }
    res.status(200).json({ message: 'Sản phẩm đã được xóa', product: softDeleteProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
  }
});

// Lấy danh sách sản phẩm
router.get('/products', async (req, res) => {
  try {
    const { minPrice, maxPrice, searchTerm, sortBy, sortOrder, page = 1, perPage = 1 } = req.query;

    let filter = { deleted: { $ne: true } }; // Thêm điều kiện không bị xóa
    if (minPrice) {
      filter.price = { $gte: minPrice };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: maxPrice };
    }
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { content: { $regex: new RegExp(searchTerm, 'i') } }
      ];
    }

    let sort = {};
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    let query = Product.find(filter);

    if (Object.keys(sort).length !== 0) {
      query = query.sort(sort);
    }

    const skip = (parseInt(page) - 1) * parseInt(perPage);

    const products = await query
      .skip(skip)
      .limit(parseInt(perPage));

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sản phẩm' });
  }
});


