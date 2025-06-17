import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from "../contexts/cartContext";
import Footer from '../components/Footer';

const CategoryPage = () => {
    const { addToCart } = useCart();    
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const url = `https://ecommerce-backend-cxlj.onrender.com/api/v1/products?category=${categoryName}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products); 
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
      console.log("Fetched products for category:", categoryName, data.products);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <span class='loader'></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <Navbar />
      <h1 className="mt-30 text-center text-4xl font-bold my-10">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}'s Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {products.length > 0 ? (
         products.map((product) => (
          <div
            key={product._id}
            className="p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white flex flex-col items-center"
          >
            <Link to={`/product/${product.id}`} className="w-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
        
            <h3 className="font-semibold text-lg text-gray-800 mb-1 text-center">
              {product.name}
            </h3>
            </Link>
        
            <p className="text-sm text-gray-500 capitalize mb-1">{product.categories}</p>
            <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
        
            <p className="text-green-600 text-lg font-bold mb-4">
              ${(product.price / 100).toFixed(2)}
            </p>
        
            <button
              className="w-full cursor-pointer bg-[#CC5500] = text-white py-2 rounded-lg transition duration-300 shadow hover:shadow-lg"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
        ) : (
          <p className="text-center w-full">No products found for this category.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default CategoryPage;
