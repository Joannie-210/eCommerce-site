import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fineOne from '../assets/fineshyt.jpg'
import fineTwo from '../assets/fineshytt.jpg'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['men', 'women'];

  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      let url = 'https://ecommerce-backend-cxlj.onrender.com/api/v1/products';

      if (category !== 'all') {
        url += `?category=${category}`;
      }

      const response = await axios.get(url);
      setProducts(response.data.products); 
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const openModalHandler = (product) => {
    setSelectedProduct(product);
  };

  const closeModalHandler = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Navbar />
      <span class='loader'></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Navbar />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      {/* Category filter */}
      <div className="p-4">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="p-2 border rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Hero video */}
     <video
  src="https://cdn.shopify.com/videos/c/o/v/f4f59cd761da4057807fd19b9e2ab16b.mp4"
  className="w-full mt-[-6px] max-h-screen object-contain"
  autoPlay
  muted
  loop
/>


      <h1 className="text-center text-4xl font-bold mt-10">Shop with us now!</h1>

      {/* Products grid */}
      <div className="w-full bg-background h-auto pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => {
  console.log(product.image);  
  return (
    <div
  key={product._id}
  className="shadow-lg bg-white lg:h-[38rem] h-150 px-5 py-5 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
>
  <Link to={`/product/${product._id}`}>
    <div className="relative group">
      <img
        src={product.images[0] || 'https://res.cloudinary.com/demo/image/upload/v1712500/sample.jpg'}
        alt={product.name}
        className="block w-full h-88 object-cover rounded-xl mb-4 group-hover:opacity-90 transition duration-300"
      />
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-80">{product.category}</span>
    </div>

    <h3 className="font-semibold text-2xl text-gray-800 mb-2 group-hover:underline">{product.name}</h3>
  </Link>

  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{product.description}</p>

  <div className="flex items-center justify-between mt-auto">
    <p className="text-green-600 text-lg font-bold">${(product.price / 100).toFixed(2)}</p>
    <button
      className="bg-[#CC5500] hover:bg-accent-dark cursor-pointer text-white px-4 py-2 rounded-lg transition-all duration-300"
      onClick={() => openModalHandler(product)}
    >
      Quick view
    </button>
  </div>
</div>

  );
})}

      </div>

      <h1 className="text-center text-4xl font-bold mt-10">Shop by Category</h1>

      {/* Category images with dark overlay */}
      <div className="flex flex-row flex-wrap gap-8 justify-center mt-12 mb-24 w-full">
  {/* Men's Category */}
  <div className="relative flex flex-col w-full md:w-[48%] max-w-2xl overflow-hidden rounded-3xl shadow-2xl group transition-all duration-300">
    <img
      className="w-full object-cover h-[900px] group-hover:scale-110 transition-transform duration-500"
      src={fineOne}
      alt="Men's Clothing"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-70"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Link to="/category/men">
        <button className="px-8 cursor-pointer py-2 w-40 border-2 border-white text-white text-lg rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          Men's
        </button>
      </Link>
    </div>
  </div>

  {/* Women's Category */}
  <div className="relative flex flex-col w-full md:w-[48%] max-w-2xl overflow-hidden rounded-3xl shadow-2xl group transition-all duration-300">
    <img
      className="w-full object-cover h-[900px] group-hover:scale-110 transition-transform duration-500"
      src={fineTwo}
      alt="Women's Clothing"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-70"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Link to="/category/women">
        <button className="px-8 cursor-pointer py-2 w-40 border-2 border-white text-white text-lg rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          Women's
        </button>
      </Link>
    </div>
  </div>
</div>



      <div className='bg-[#CC5500] w-full h-auto flex flex-col items-center justify-center'>
        <h1 className='text-xl mb-10 mt-10 text-center text-white'><em>Our mission is to ensure you turn heads at a budget!  Transform your style to its fullest potential</em></h1>
      </div>
      <video src="https://cdn.shopify.com/videos/c/o/v/189099819a87448e8de16605f2ba18f1.mp4" autoplay loop playsinline class="w-full h-135 mt-29"></video>

      {/* Product modal */}
     {selectedProduct && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in-up">
      {/* Close button in top right */}
      <button
        onClick={closeModalHandler}
        className="absolute top-3 right-3 text-gray-600 hover:text-[#CC5500] transition duration-200"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedProduct.name}</h2>
        <img
          src={
            selectedProduct.images[0] ||
            'https://res.cloudinary.com/demo/image/upload/v1712500/sample.jpg'
          }
          alt={selectedProduct.name}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

        <button
          onClick={closeModalHandler}
          className="w-full bg-[#CC5500] hover:bg-[#b34900] text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

<Footer />
    </div>
  );
};

export default HomePage;
