import "../../styles/OrdersPage.css";
import { getAllItems, removeItemFromCart } from "../../utils/cartRequest";
import React, { useState, useEffect } from "react";

function OrdersPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(
    Array(products.length).fill(false)
  );
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "Credit Card", // Giả sử mặc định là Credit Card
  });

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromCart(itemId);
      const items = await getAllItems();
      setProducts(items);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
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
        shippingPrice: 30000,
        totalPrice: totalAmount + 30000,
        user: "user_id_placeholder",
      };
      console.log(orderData);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getAllItems();
        setProducts(items);
        setQuantities(Array(items.length).fill(1));
        setIsChecked(Array(items.length).fill(false));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const newTotalAmount = products.reduce((total, product, index) => {
      if (isChecked[index]) {
        return total + product.price * quantities[index];
      }
      return total;
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [quantities, isChecked]);

  return (
    <div className="orders-container">
      <h4
        style={{
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "10px 30px",
        }}
      >
        Giỏ hàng
      </h4>
      <div className="infor-user">
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
        </select>
      </div>
      <table className="table-style">
        <thead className="header-table">
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
        <tbody className="body-table">
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
                <button onClick={() => handleRemoveItem(product._id)}>
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
                  className="payment-checkbox"
                  type="checkbox"
                  checked={isChecked[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment-component">
        <h4>Tiền Vận Chuyển: $30000</h4>
        <h4>Thành Tiền: ${totalAmount + 30000}</h4>

        <button className="button-buy" onClick={handleBuyClick}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default OrdersPage;
