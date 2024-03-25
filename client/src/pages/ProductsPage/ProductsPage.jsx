import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../utils/productsRequest';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        console.log(productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
    }
    console.log("hehehehe")
    console.log(product)
  return (
    <div className="product-detail">
      <h2>{product.result.name}</h2>
      <img src={product.result.image_link} alt={product.result.name} />
      <p>Type: {product.result.type}</p>
      <p>Price: {product.result.price}</p>
      <p>Count in stock: {product.result.countInstock}</p>
      <p>Rating: {product.result.rating}</p>
      <p>Description: {product.result.description}</p>
    </div>
  );
}

export default ProductPage;
