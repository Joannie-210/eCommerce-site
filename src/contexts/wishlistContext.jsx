// import React, { createContext, useContext, useState } from "react";

// // Create Context
// const WishlistContext = createContext();

// // Provider Component
// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // Add item to wishlist
//   const addToWishlist = (product) => {
//     setWishlistItems((prev) => {
//       // Avoid duplicates by checking product._id
//       if (prev.find((item) => item._id === product._id)) return prev;
//       return [...prev, product];
//     });
//   };

//   // Remove item from wishlist
//   const removeFromWishlist = (productId) => {
//     setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
//   };

//   // Check if item is in wishlist
//   const isInWishlist = (productId) => {
//     return wishlistItems.some((item) => item._id === productId);
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// // Custom Hook for easy usage
// export const useWishlist = () => {
//   return useContext(WishlistContext);
// };
