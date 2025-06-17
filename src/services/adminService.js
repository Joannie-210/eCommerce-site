import apiClient from "./apiClient";


export const createProduct = async (formData) => {
  try {
    const response = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Product creation failed";
  }
};


export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.categories;
  } catch (error) {
    throw "Failed to fetch categories " + error;
  }
};


export const fetchBrands = async () => {
  try {
    const response = await apiClient.get("/brands");
    return response.data.brands;
  } catch (error) {
    throw "Failed to fetch brands " + error;
  }
};


export const fetchColors = async () => {
  try {
    const response = await apiClient.get("/colors");
    return response.data.colors;
  } catch (error) {
    throw "Failed to fetch colors " + error;
  }
};


export const fetchUsersList2 = async () => {
  try {
    const response = await apiClient.get("/users/list");
    return response.data.data || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch users list";
  }
};

export const fetchUsersList = async (cursor = null) => {
  try {
    let url = "/users/list";
    if (cursor) {
      url += `?cursor=${cursor}`;
    }
    const response = await apiClient.get(url);
    const { data, nextCursor } = response.data;
    return { users: data, nextCursor };
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch users list";
  }
};


export const fetchProductsList = async () => {
  try {
    const response = await apiClient.get("/products/");
    return response.data.products || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch products list";
  }
};


export const fetchUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user details";
  }
};
