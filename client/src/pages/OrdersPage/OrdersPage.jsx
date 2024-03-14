import React, { useState, useEffect } from "react";
import "./OrdersPage.css";
const products = [
  {
    name: "Product 1",
    price: 10,
    type: "Type A",
    countInstock: 50,
    image_link:
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
    image_list: [
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
      "https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
    ],
    rating: 4.5,
    description: "Description for product 1",
  },
  {
    name: "Product 2",
    price: 12,
    type: "Type A",
    countInstock: 50,
    image_link:
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
    image_list: [
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
      "https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
    ],
    rating: 4.5,
    description: "Description for product 1",
  },
  {
    name: "Product 3",
    price: 11,
    type: "Type A",
    countInstock: 50,
    image_link:
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
    image_list: [
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
      "https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
    ],
    rating: 4.5,
    description: "Description for product 1",
  },
  {
    name: "Product 4",
    price: 15,
    type: "Type A",
    countInstock: 50,
    image_link:
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
    image_list: [
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
      "https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
    ],
    rating: 4.5,
    description: "Description for product 1",
  },
  {
    name: "Product 5",
    price: 14,
    type: "Type A",
    countInstock: 50,
    image_link:
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
    image_list: [
      "https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg",
      "https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
    ],
    rating: 4.5,
    description: "Description for product 1",
  },
];
function OrdersPage() {
  const [quantities, setQuantities] = useState(Array(products.length).fill(1));
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(
    Array(products.length).fill(false)
  );
  useEffect(() => {
    const newTotalAmount = products.reduce((total, product, index) => {
      if (isChecked[index]) {
        return total + product.price * quantities[index];
      }
      return total;
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [quantities, isChecked]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleCheckboxChange = (index) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    setIsChecked(newIsChecked);
  };
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "Credit Card", // Giả sử mặc định là Credit Card
  });
  const handleBuyClick = async () => {
    try {
      const selectedProducts = products.filter(
        (product, index) => isChecked[index]
      );
      const orderData = {
        orderItems: selectedProducts.map((product, index) => ({
          name: product.name,
          amount: quantities[index],
          image: product.image_link,
          price: product.price,
          product: product._id,
        })),
        shippingAddress: {
          fullName: userInfo.fullName,
          address: userInfo.address,
          phone: userInfo.phone,
        },
        paymentMethod: userInfo.paymentMethod,
        itemsPrice: totalAmount,
        shippingPrice: 10,
        totalPrice: totalAmount + 10,
        user: "user_id_placeholder",
      };
      console.log(orderData);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="ProductsContainer">
      <h4
        style={{
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "10px 30px",
        }}
      >
        Giỏ hàng
      </h4>
      <div className="inforUser">
        <label>Họ và Tên:</label>
        <input
          type="text"
          value={userInfo.fullName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, fullName: e.target.value })
          }
        />
        <label>Địa chỉ:</label>
        <input
          type="text"
          value={userInfo.address}
          onChange={(e) =>
            setUserInfo({ ...userInfo, address: e.target.value })
          }
        />
        <label>Số điện thoại:</label>
        <input
          type="text"
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
        <label>Đơn vị vận chuyển:</label>
        <select
          value={userInfo.paymentMethod}
          onChange={(e) =>
            setUserInfo({ ...userInfo, paymentMethod: e.target.value })
          }
        >
          <option value="giaohangnhanh">Giao hàng nhanh</option>
          <option value="JT">J&T Express</option>
          <option value="SE">Standard Express</option>
        </select>
        <label>Phương thức thanh toán:</label>
        <select
          value={userInfo.paymentMethod}
          onChange={(e) =>
            setUserInfo({ ...userInfo, paymentMethod: e.target.value })
          }
        >
          <option value="COD">COD</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          
        </select>
      </div>
      <table className="tableStyle">
        <thead className="headerTable">
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Hình Ảnh</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Số Tiền</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bodyTable">
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <img src={product.image_link} alt="" />
              </td>
              <td>${product.price}</td>
              <td>
                <div className="quantity-selector">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        index,
                        Math.max(1, quantities[index] - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span>{quantities[index]}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, quantities[index] + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${product.price * quantities[index]}</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                    color="#429a9d"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </td>
              <td>
                <input
                  className="paymentCheckbox"
                  type="checkbox"
                  checked={isChecked[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paymentComponent">
        <h4>Thành Tiền: ${totalAmount}</h4>
        <button className="buttonBuy" onClick={handleBuyClick}>Thanh toán</button>
      </div>
    </div>
  );
}

export default OrdersPage;
