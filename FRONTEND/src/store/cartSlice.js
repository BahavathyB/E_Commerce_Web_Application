import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch cart items
export const fetchCartItems = () => async (dispatch) => {
  console.log(" inside fetch cart")
  try {
    const token = localStorage.getItem("auth_token");
    console.log("token:" , token);
    
    const response = await axios.get("http://localhost:3000/cart/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cart = response.data.cart;

    dispatch(setCartItems(cart));
    dispatch(calculateTotal(cart));
  } catch (err) {
    console.error("Error fetching cart:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },

  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    calculateTotal: (state, action) => {
      const cart = action.payload || state.cartItems || [];

      const total = cart.reduce(
        (acc, item) => acc + (item.new_price || 0) * (item.quantity || 1),
        0
      );

      state.totalAmount = total;
    },
  },
});

export const { setCartItems, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
