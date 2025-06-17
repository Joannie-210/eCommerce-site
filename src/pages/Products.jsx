// SingleProduct.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/userService';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/cartContext';
// import {addToWishList, removeFromWishlist} from '../contexts/wishlistContext'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, openModalHandler } = useCart(); 
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const { addToWishList } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://ecommerce-backend-cxlj.onrender.com/api/v1/products/${id}`);
        setProduct(response.data.productFound); 
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Could not load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

   useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await getProducts();
          setProducts(res.products);
        } catch (error) {
          console.error('Failed to fetch products', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);
  
  if (loading) return <span class='loader'></span>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="p-4">
    <Navbar />
    {loading && (
            <div className="w-full h-full flex items-center justify-center h-screen">
                    <span className='loader'></span>
                                </div>)}
    {product && (
  <div className="mt-20 px-4">
  <div className="flex flex-col md:flex-row gap-8 items-center bg-white shadow-md rounded-2xl p-8 max-w-7xl mx-auto transition-all duration-300">
    {/* Product Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src={product.images}
        alt={product.name}
        className="w-full max-w-sm h-auto object-contain rounded-xl border border-gray-200 shadow-md"
      />
    </div>

    {/* Product Info */}
    <div className="w-full md:w-1/2 flex flex-col gap-3 text-left">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Brand:</span> {product.brand}
      </p>

      <p className="text-2xl font-semibold text-green-600">
        ${product.price.toFixed(2)}
      </p>

      <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
        <p><span className="font-semibold">Category:</span> {product.category}</p>
        <p><span className="font-semibold">Review:</span> {product.totalReview}</p>
        <p><span className="font-semibold">Created:</span> {product.createdAt}</p>
        <p><span className="font-semibold">Updated:</span> {product.updatedAt}</p>
        <p><span className="font-semibold">In Stock:</span> {product.totalQty}</p>
        <p><span className="font-semibold">Sold:</span> {product.totalSold}</p>
        <p><span className="font-semibold">Left:</span> {product.qtyLeft}</p>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => addToCart(product)}
          className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Add to Cart
        </button>

        <button
          onClick={() => openModalHandler(product)}
          className="cursor-pointer bg-white border border-gray-400 hover:border-gray-600 text-gray-800 px-6 py-2 rounded-lg shadow-sm transition duration-300"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</div>

)}

<Footer />
    </div>
  );
};

export default Products;
