// src/actions/cartActions.js
import axios from "axios";

const API_BASE_URL = "https://e-commerce-backend-xnl1.onrender.com"; // adjust to your backend base URL

const token = localStorage.getItem("auth_token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const addToCart = async (productId) => {
    console.log("inside add to cart services");
    console.log(token);
       
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cart/add`,
      { productId },
      config
    );
    console.log("Added to cart:", response.data);
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
  }
};

export const deleteFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/delete/${productId}`, config);
    
    console.log("Deleted from cart:", response.data);
  } catch (error) {
    console.error(
      "Delete from cart error:",
      error.response?.data || error.message
    );
  }
};

export const reduceCartItem = async (productId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cart/reduce`,
      { productId },
      config
    );
    console.log("Reduced cart item:", response.data);
  } catch (error) {
    console.error(
      "Reduce cart item error:",
      error.response?.data || error.message
    );
  }
};

export const resetCart = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cart/reset`,
      {},
      config
    );
    console.log("Cart reset:", response.data);
  } catch (error) {
    console.error("Reset cart error:", error.response?.data || error.message);
  }
};
