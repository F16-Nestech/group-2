import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../utils/request";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    searchTerm: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    perPage: 15,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchData();
  }, [filters]); // Gọi fetchData khi filters thay đổi

  const fetchData = async () => {
    try {
      const productList = await getAllProducts(filters);
      setProducts(productList.products);
      setPagination({
        page: productList.pagination.page,
        totalPages: productList.pagination.totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortBy, sortOrder] = value.split(',');
    setFilters({ ...filters, sortBy, sortOrder });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const { page, totalPages } = pagination;

    const handleNextPage = () => {
      if (page < totalPages) {
        handlePageChange(page + 1);
      }
    };

    const handlePrevPage = () => {
      if (page > 1) {
        handlePageChange(page - 1);
      }
    };

    if (totalPages > 1) {
      if (page !== 1) {
        pageNumbers.push(
          <button key="prev" onClick={handlePrevPage}>
            Prev
          </button>
        );
      }

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button key={i} onClick={() => handlePageChange(i)} disabled={i === page}>
            {i}
          </button>
        );
      }

      if (page !== totalPages) {
        pageNumbers.push(
          <button key="next" onClick={handleNextPage}>
            Next
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="Container">
      <div className="HomepageContainer">
        <HeaderComponent />
        <div className="Filters">
          <h2>Filters</h2>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search"
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <select onChange={handleSortChange}>
            <option value="">      </option>
            <option value="price,asc">Tăng dần</option>
            <option value="price,desc">Giảm dần</option>
          </select>
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
            {getPageNumbers()}
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default HomePage;
