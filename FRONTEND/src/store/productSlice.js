import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = () => async (dispatch) => {
  dispatch(fetchAllProductsStart());

  try{
    let response = await axios.get("http://localhost:3000/allproducts");
    console.log("response.data", response.data)
    dispatch(fetchAllProductsSuccess(response.data.allProducts));
  }
  catch(error){
    dispatch(fetchAllProductsFailure(error.message || "Failed to fetch products"))
  }
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    loading: false,
    error: null,
  },

  reducers: {
    fetchAllProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchAllProductsSuccess: (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchAllProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllProductsFailure,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
} = productSlice.actions;

export default productSlice.reducer;
