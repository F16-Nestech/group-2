const fakeProducts = [
    {
        name: 'Product 1',
        price: 10,
        type: 'Type A',
        countInstock: 50,
        image_link: 'https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg',
        image_list: ['https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg', 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png'],
        rating: 4.5,
        description: 'Description for product 1',
    },
    {
        name: 'Product 2',
        price: 12,
        type: 'Type A',
        countInstock: 50,
        image_link: 'https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg',
        image_list: ['https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg', 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png'],
        rating: 4.5,
        description: 'Description for product 1',
    },
    {
        name: 'Product 3',
        price: 11,
        type: 'Type A',
        countInstock: 50,
        image_link: 'https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg',
        image_list: ['https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg', 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png'],
        rating: 4.5,
        description: 'Description for product 1',
    },
    {
        name: 'Product 4',
        price: 15,
        type: 'Type A',
        countInstock: 50,
        image_link: 'https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg',
        image_list: ['https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg', 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png'],
        rating: 4.5,
        description: 'Description for product 1',
    },
    {
        name: 'Product 5',
        price: 14,
        type: 'Type A',
        countInstock: 50,
        image_link: 'https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg',
        image_list: ['https://uploads.nguoidothi.net.vn/content/5cbffc46-c13f-4ad8-9f9b-2d6df2c51471.jpg', 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png'],
        rating: 4.5,
        description: 'Description for product 1',
    },
    
];
const getAllProducts = async (filters) => {
    try {
      let filteredProducts = fakeProducts;
  
      if (filters.minPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= filters.minPrice
        );
      }
  
      if (filters.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= filters.maxPrice
        );
      }
  
      if (filters.searchTerm !== '') {
        const searchTerm = filters.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
      }
  
      if (filters.sortBy === 'price') {
        if (filters.sortOrder === 'asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filters.sortOrder === 'desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }
      }
  
      // Return the filtered products
      return filteredProducts;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
export default getAllProducts