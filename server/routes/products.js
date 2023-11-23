import express from 'express'
import Product from '../models/productModel';
const router = express.Router()


// Tạo sản phẩm
router.post('/products/create', async (req, res) => {
  try {
    const { name, price, content, discount, image_link, image_list } = req.body;

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
router.put('/products/edit/:id', async (req, res) => {
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
      { new: true }
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
router.delete('/products/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được xóa', product: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
  }
});

// Lấy danh sách sản phẩm
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sản phẩm' });
  }
});

