import React from "react";
import { addItemToCart, getAllItems } from "../../utils/cartRequest";

const ButtonCart = ({ product }) =>  {
  const priceDiscount = (product) => {
    return product.price - (product.discount * product.price) / 100;
  };
  const handleAddToCart = async () => {
    try {
      const cart = await getAllItems();
      console.log(cart);
      const isAlreadyInCart = cart.some((cartItem) => cartItem.name === product.name);
      console.log(isAlreadyInCart);
      if (isAlreadyInCart) {
        console.log("Sản phẩm đã có trong giỏ hàng.");
      } else {
        const ItemsData = {
          name: product.name,
          image: product.image_link,
          price: isNaN(priceDiscount(product)) ? product.price : priceDiscount(product),
          product: product._id,
        };
        console.log(ItemsData)
        await addItemToCart(ItemsData);
        console.log("Sản phẩm đã được thêm vào giỏ hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <button className="cart-button" onClick={handleAddToCart}>
      Thêm vào giỏ hàng
    </button>
  );
}

export default ButtonCart;
