import apiClient from "./apiClient";

 
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);

    const { message, data } = response.data;

    return {
      message,
      user: { fullName: data.fullName, email: data.email, id: data._id },
    };
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    const { message, token, userFound } = response.data;
    return {
      message,
      token,
      user: {
        fullName: userFound.fullName,
        email: userFound.email,
        id: userFound._id,
      },
    };
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const getProducts = async () => { // Remove unused parameter
  try {
    const response = await apiClient.get("/products"); 
    const { message, products: productList, status } = response.data;
    
    
    const formattedProducts = productList.map(product => ({
      _id: product._id,
      name: product.name,
      images: product.images || "https://via.placeholder.com/300x200",
      description: product.description,
      brand: product.brand,
      category: product.category,
      sizes: product.sizes || [], 
      colors: product.colors || [],
      price: product.price, 
      rating: product.averageRating
    }));
    
    return {
      message,
      status,
      products: formattedProducts
    };
  } catch(error) {
    throw error.response?.data?.message || error.message || "Product not found";
  }

}



export const getSingleProduct = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


export const getCategories = async () => {
  const res = await axios.get("https://ecommerce-backend-cxlj.onrender.com/api/v1/categories");
  return res.data.categories;
};
