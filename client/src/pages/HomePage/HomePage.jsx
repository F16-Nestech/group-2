import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../utils/productsRequest";
import { TextField, Button, Select, MenuItem, Pagination } from "@mui/material";
import "./HomePage.css";
import { getAllBanners } from "../../utils/bannerRequest";
// import fakeBanners from "../../fakedata/fakebanners";
// import getAllProducts from "../../fakedata/fakeproducts";
// const getAllBanners = async () => {
//   console.log(fakeBanners);
//   return fakeBanners;
// };
function homePage() {
  const [products, setProducts] = useState([]);
  const [minPriceError, setMinPriceError] = useState(null);
  const [maxPriceError, setMaxPriceError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    searchTerm: "",
    sortBy: "price",
    sortOrder: "asc",
    page: 1,
    perPage: 15,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 3,
  });

  useEffect(() => {
    fetchData();
  }, [filters]); // Gọi fetchData khi filters thay đổi

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // Đợi 500ms trước khi gửi yêu cầu, để tránh gửi quá nhiều yêu cầu khi người dùng đang nhập
    return () => clearTimeout(timer);
  }, [filters.searchTerm]); // Gọi fetchData khi searchTerm thay đổi
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "minPrice" || name === "maxPrice") {
      const intValue = parseInt(value);
      if (value !== "" && (isNaN(intValue) || intValue < 0)) {
        name === "minPrice"
          ? setMinPriceError("Giá trị phải là số nguyên dương")
          : setMaxPriceError("Giá trị phải là số nguyên dương");
        return;
      }

      if (
        name === "minPrice" &&
        (intValue >= filters.maxPrice || filters.maxPrice === "")
      ) {
        setMinPriceError("Min Price phải nhỏ hơn Max Price");
        return;
      }

      if (
        name === "maxPrice" &&
        (intValue <= filters.minPrice || filters.minPrice === "")
      ) {
        setMaxPriceError("Max Price phải lớn hơn Min Price");
        return;
      }
    }
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    setMinPriceError(null);
    setMaxPriceError(null);
    fetchData(updatedFilters);
  };
  const fetchData = async (updatedFilters) => {
    try {
      const fetchedProducts = await getAllProducts(updatedFilters || filters);
      setProducts(fetchedProducts);
      setPagination({
        page: fetchedProducts.pagination.page,
        totalPages: fetchedProducts.pagination.totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortBy, sortOrder] = value.split(",");
    setFilters({ ...filters, sortBy, sortOrder });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const handlePaginationChange = (event, value) => {
    handlePageChange(value);
  };

  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lengthBanner = banners.length;
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === lengthBanner - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Chuyển banner sau mỗi 5 giây

    return () => clearTimeout(timeout);
  }, [banners, currentBannerIndex]);

  // Function to fetch banners
  const fetchBanners = async () => {
    try {
      const fetchedBanners = await getAllBanners();
      if (Array.isArray(fetchedBanners)) {
        // Kiểm tra nếu giá trị trả về là một mảng
        setBanners(fetchedBanners);
      } else {
        console.error("getAllBanners không trả về một mảng");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="homepageContainer">
        <div className="banners">
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.imageUrl}
              alt={`Banner ${index}`}
              className={index === currentBannerIndex ? "active" : "inactive"}
            />
          ))}
        </div>
        <h4 className="filter">Lọc</h4>
        <div className="filters">
          <TextField
            type="text"
            name="searchTerm"
            label="Search"
            size="small"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            style={{ width: "300px" }}
          />
          <TextField
            type="number"
            name="minPrice"
            label="Min Price"
            size="small"
            helperText={minPriceError}
            value={filters.minPrice}
            onChange={handleFilterChange}
            inputProps={{ min: 0 }}
          />
          <TextField
            type="number"
            name="maxPrice"
            label="Max Price"
            size="small"
            helperText={maxPriceError}
            value={filters.maxPrice}
            onChange={handleFilterChange}
            inputProps={{ min: 0 }}
          />
          <Select
            value={`${filters.sortBy},${filters.sortOrder}`}
            onChange={handleSortChange}
            size="small"
          >
            <MenuItem value="price,asc">Tăng dần</MenuItem>
            <MenuItem value="price,desc">Giảm dần</MenuItem>
          </Select>
        </div>
        <div className="productsContainer">
          <h4
            style={{
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
              padding: "10px 30px",
            }}
          >
            Danh sách sản phẩm
          </h4>
          <ul className="productsList">
            {products.map((product) => (
              <li key={product._id}>
                <p>{product.name}</p>
                <img src={product.image_link} alt="" />
                <p>Giá: {product.price}</p>
                {product.discount && <p>{product.discount}</p>}
              </li>
            ))}
          </ul>
          <div className="pagination">
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={handlePaginationChange}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default homePage;
