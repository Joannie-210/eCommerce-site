import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/userService';
import { useCart } from '../contexts/cartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../components/Footer';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sign, setSign] = useState(<FaPlus />);
  const [selectedOption, setSelectedOption] = useState('');
  const [show, setShow] = useState(false);
  const { addToCart } = useCart();

  const plusOnClick = () => {
    setShow(prev => {
      const newShow = !prev;
      setSign(newShow ? <FaMinus /> : <FaPlus />);
      return newShow;
    });
  };

  const clearOnClick = () => {
    setShow(false);
    setSign(<FaPlus />);
    setSelectedOption('');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loader" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center cursor-pointer mb-4" onClick={plusOnClick}>
                <p className="text-gray-800 font-medium">Sort by</p>
                <button className="text-[#cc5500]">{sign}</button>
              </div>

              {show && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 text-sm">
                    <input
                      type="radio"
                      name="sort"
                      value="option1"
                      checked={selectedOption === 'option1'}
                      onChange={e => setSelectedOption(e.target.value)}
                    />
                    Prices from high to low
                  </label>
                  <label className="flex items-center gap-2 text-gray-700 text-sm">
                    <input
                      type="radio"
                      name="sort"
                      value="option2"
                      checked={selectedOption === 'option2'}
                      onChange={e => setSelectedOption(e.target.value)}
                    />
                    Prices from low to high
                  </label>
                </div>
              )}

              {(selectedOption === 'option1' || selectedOption === 'option2') && (
                <div className="mt-5 space-y-3">
                  <button className="w-full py-2 rounded bg-[#cc5500] text-white">Apply (1)</button>
                  <button onClick={clearOnClick} className="w-full py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
                    Clear all (1)
                  </button>
                </div>
              )}
            </aside>

            {/* Product Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <div
                    key={product._id}
                    className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-lg"
                  >
                    <Link to={`/product/${product.id}`} className="block group">
                      <div className="relative">
                        <img
                          src={product.images || 'https://via.placeholder.com/300x200'}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:opacity-90 transition"
                        />
                        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:underline">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{product.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <p className="text-green-600 font-bold text-md">${(product.price / 100).toFixed(2)}</p>
                          <button
                            className="bg-[#cc5500] text-white px-3 py-1.5 rounded hover:bg-[#a64500] transition"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;
