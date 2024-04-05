import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../utils/productsRequest";
import "../../styles/ProductsPage.css";
import Rating from "@mui/material/Rating";
import ButtonCart from "../../components/Button/buttonCart";
import ButtonBuyProduct from "../../components/Button/buttonBuyProduct";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        // Set the main image to the first image in the list by default
        if (productData && productData.result.image_list.length > 0) {
          setMainImage(productData.result.image_list[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const changeMainImage = (thumbnail) => {
    setMainImage(thumbnail);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail">
        <div className="product-image">
          <img id="img-product" src={mainImage} alt={product.result.name} />
          <div className="image-list">
            {product.result.image_list.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.result.name}
                className="thumbnail"
                onClick={() => changeMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h2 id="product-name">{product.result.name}</h2>
          <div id="rate-star">
            <p>Đánh giá: </p>
            <Rating
            id="star"
              name="half-rating-read"
              defaultValue={product.result.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <p id="product-price">${product.result.price}</p>
          <div id="return-policy">
            <p>Chính Sách Trả Hàng</p>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg"
              className="ikrz0A"
              alt="Chính Sách Trả Hàng"
            />
            <div className="Q8e31z">Trả hàng 15 ngày</div>
            <div className="w8_Dsz">Đổi ý miễn phí</div>
          </div>
          <p id="product-instock">{product.result.countInstock} sản phẩm có sẵn</p>
          <p id="product-rating"></p>
          <div id="button-product">
            <ButtonBuyProduct />
            <ButtonCart product={product.result} />
          </div>
        </div>
      </div>
      <div id="product-details">
        <h2>CHI TIẾT SẢN PHẨM</h2>
        <p>Danh mục: {product.result.type}</p>
        <p>Kho hàng: {product.result.countInstock}</p>
        <p>Được phân phối bởi : OSM-Chi Nhánh Hà Nội</p>
      </div>
      <div id="detailed-description">
        <h2>MÔ TẢ CHI TIẾT:</h2>
        <p id="product-description">{product.result.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
