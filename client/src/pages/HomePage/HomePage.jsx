import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../utils/request";
import { TextField, Button, Select, MenuItem, Pagination } from '@mui/material';
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    searchTerm: '',
    sortBy: '',
    sortOrder: '',
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

  const fetchData = async () => {
    try {
      const products = await getAllProducts(filters);
      setProducts(products.products);
      setPagination({
        page: products.pagination.page,
        totalPages: products.pagination.totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "minPrice" || name === "maxPrice") {
      const intValue = parseInt(value);
      if (value !== "" && (isNaN(intValue) || intValue < 0)) {
        setError("Giá trị phải là số nguyên dương");
        return;
      }
  
      if (name === "minPrice" && (intValue >= filters.maxPrice || filters.maxPrice === '')) {
        setError("Min Price phải nhỏ hơn Max Price");
        return;
      }
  
      if (name === "maxPrice" && (intValue <= filters.minPrice || filters.minPrice === '')) {
        setError("Max Price phải lớn hơn Min Price");
        return;
      }
    }
  
    setFilters({ ...filters, [name]: value });
    setError(null); // Reset error sau khi điều kiện được đáp ứng
  };
  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortBy, sortOrder] = value.split(',');
    setFilters({ ...filters, sortBy, sortOrder });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const handlePaginationChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <div className="Container">
      <div className="HomepageContainer">
        <div className="Filters">
          <h2>Filters</h2>
          <TextField
            type="text"
            name="searchTerm"
            label="Search"
            size="small"
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
          <TextField
            type="number"
            name="minPrice"
            label="Min Price"
            size="small"
            helperText={error}
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <TextField
            type="number"
            name="maxPrice"
            label="Max Price"
            size="small"
            helperText={error}
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <Select value={`${filters.sortBy},${filters.sortOrder}`} onChange={handleSortChange} size="small">
            <MenuItem value="price,asc">Tăng dần</MenuItem>
            <MenuItem value="price,desc">Giảm dần</MenuItem>
          </Select>
        </div>
        <div className="ProductsContainer">
          <h1>Danh sách sản phẩm</h1>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <p>{product.name}</p>
                <p>Giá: {product.price}</p>
                {product.discount && (
                  <p>{product.discount}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="Pagination">
            
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

export default HomePage;
