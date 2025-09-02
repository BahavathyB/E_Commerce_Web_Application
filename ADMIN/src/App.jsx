import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ pt: "70px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-products" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
