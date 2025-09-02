import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignUp from "./pages/LoginSignUp";
import Footer from "./components/Footer";

import banner_kids from "./assets/banner_kids.png";
import banner_mens from "./assets/banner_mens.png";
import banner_women from "./assets/banner_women.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "./store/productSlice";
import { fetchCartItems } from "./store/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state) => state.products
  );
 

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCartItems());
  }, [dispatch]);



  if (loading) {
    return <h1>Loading......................</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/men"
            element={<ShopCategory banner={banner_mens} category="Men" />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={banner_women} category="Women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={banner_kids} category="Kids" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
