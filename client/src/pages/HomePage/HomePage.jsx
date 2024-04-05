import "../../styles/HomePage.css";

import fakeBanners from "../../fakedata/fakebanners";
import { getAllProducts } from "../../utils/productsRequest";
import ButtonCart from "../../components/Button/buttonCart"
import ButtonBuyProduct from "../../components/Button/buttonBuyProduct"
import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Pagination } from "@mui/material";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [minPriceError, setMinPriceError] = useState(null);
  const [maxPriceError, setMaxPriceError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    searchTerm: "",
    sortBy: "price",
    sortOrder: "asc",
    page: 1,
    perPage: 3,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 3,
  });

  const getAllBanners = async () => {
    return fakeBanners;
  };

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
      const allProducts = await getAllProducts();
      const fetchedProducts = await getAllProducts(updatedFilters || filters);
      setProducts(fetchedProducts);
      const totalProducts = allProducts.length;
      const newTotalPages = Math.ceil(totalProducts / filters.perPage);
      setPagination({
        page:
          updatedFilters && updatedFilters.page !== undefined
            ? updatedFilters.page
            : filters.page,
        totalPages: newTotalPages,
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

  const handlePageChange = (event, value) => {
    setFilters({ ...filters, page: value });
  };

  const fetchBanners = async () => {
    try {
      const fetchedBanners = await getAllBanners();
      if (Array.isArray(fetchedBanners)) {
        setBanners(fetchedBanners);
      } else {
        console.error("getAllBanners không trả về một mảng");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const priceDiscount = (product) => {
    return product.price - (product.discount * product.price) / 100;
  };

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

  useEffect(() => {
    fetchData();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.searchTerm]);

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
          <ul className="products-list">
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <a href={`/products/${product._id}`} className="link-products">
                  <p>{product.name}</p>
                  <img src={product.image_link} alt="ảnh sản phẩm" />
                  <div>
                    {isNaN(priceDiscount(product)) ? (
                      <p>Giá: {product.price}</p>
                    ) : (
                      <div className="style-price">
                        <p>Giá: </p>
                        <p className="price-item">{product.price}</p>
                        <p className="price-discount-item">
                          {priceDiscount(product)}
                        </p>
                      </div>
                    )}
                  </div>
                
                {product.discount && (
                  <p className="style-discount">-{product.discount}%</p>
                )}
                </a>
                <div id="button-product">
                  <ButtonBuyProduct />
                  <ButtonCart  product={product}/>
                </div>
                
              </li>
            ))}
          </ul>
          <div className="pagination">
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
