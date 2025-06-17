import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/cartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <h1 className="text-center mt-30 text-4xl font-bold">Your Cart</h1>

     {cartItems.length === 0 ? (
  <div className="text-center py-5">
    <p className="text-lg text-gray-500">🛒 Whoopsie! Nothing to see here.</p>
  </div>
) : (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    {/* <h2 className="text-3xl font-bold text-gray-800 mb-8">Pending items</h2> */}

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-between p-5 border border-gray-200 rounded-xl shadow bg-white hover:shadow-md transition duration-300"
        >
          <img
            src={item.images}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg mb-4"/>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500 capitalize">
              Category: {item.category}
            </p>
            <p className="text-base font-bold text-green-600 mt-2">
              ${(item.price / 100).toFixed(2)}
            </p>
          </div>
        <div className="flex flex-col gap-2">
<button className="mt-auto cursor-pointer bg-green-700 rounded-md text-white px-4 py-2 text-sm  shadow transition duration-300"onClick={() => alert(`Order placed for ${item.name}`)}>
            Order Now
          </button>
          <button
            className="mt-auto cursor-pointer hover:bg-red-500 rounded-md hover:text-white border-red-500 text-red-500 border-2 px-4 py-2 text-sm rounded- shadow transition duration-300"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
        Total:{" "}
        <span className="text-green-700 font-bold">
          ${(totalPrice / 100).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-[#cc5500] hover:bg-[#b84c00] text-white px-6 py-2 rounded-lg transition"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CartPage;
