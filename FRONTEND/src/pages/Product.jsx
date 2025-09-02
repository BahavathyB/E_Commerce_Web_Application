import {
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { addToCart } from "../store/cartServices";
import { fetchCartItems } from "../store/cartSlice";


const Product = () => {

  const allProducts = useSelector((state) => state.products.allProducts);
  const { productID } = useParams();
  const product = allProducts.find((item) => item.id === Number(productID));
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();


  const handleCartAdd = async (id) => {
    await addToCart(id);
    dispatch(fetchCartItems());
  };

  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          width: "100",
          mx: 2,
          mt: 2,
          mb: 6,
          px: { xs: 2, md: 6 },
          py: 4,
          
        }}
      >
        {/* Breadcrumb */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={2}
          flexWrap="wrap"
        >
          <span>Home</span>
          <KeyboardArrowRightIcon />
          <span>ShopCategory</span>
          <KeyboardArrowRightIcon />
          <span>{product.category}</span>
          <KeyboardArrowRightIcon />
          <span>{product.name}</span>
        </Stack>

        {/* Main Content */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="center"
        >
          {/* Thumbnails */}
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={2}
            alignItems="center"
          >
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={product.image}
                alt="thumb"
                style={{
                  width: 80,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            ))}
          </Stack>

          {/* Main Image */}
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: 350 },
              height: { xs: 300, sm: 400, md: 450 },
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>

          {/* Product Details */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={4}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5" fontWeight="bold">
                {product.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating defaultValue={product.rating} readOnly />
                <Typography variant="body2">(122)</Typography>
              </Box>
              <Box display="flex" gap={3} alignItems="center">
                <Typography
                  variant="h4"
                  color="success.main"
                  fontWeight="bold"
                >
                  ₹{product.new_price}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textDecoration: "line-through", color: "#999" }}
                >
                  ₹{product.old_price}
                </Typography>
              </Box>
              <Typography color="text.secondary">
                {product.description}
              </Typography>
            </Box>

            {/* Size Selector */}
            <Box>
              <Typography fontWeight="bold" mb={1}>
                Select Size
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <Box
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      textAlign: "center",
                      backgroundColor:
                        selectedSize === size ? "#c2c2a3" : "transparent",
                      fontWeight: selectedSize === size ? "bold" : "normal",
                    }}
                  >
                    {size}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              color="error"
              sx={{ width: 200 }}
              onClick={() => handleCartAdd(product.id)}
            >
              ADD TO CART
            </Button>

            <Box>
              <Typography variant="body1">
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography variant="body1">
                <strong>Tags:</strong> {product.tags}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Description / Reviews */}
      <Stack margin="50px auto" gap={4} px={{ xs: 2, md: 6 }}>
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "50px",
              backgroundColor: "#c2c2a3",
              color: "black",
            }}
          >
            Description
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "50px",
              backgroundColor: "#c2c2a3",
              color: "black",
            }}
          >
            Reviews
          </Button>
        </Stack>
        <Box sx={{ border: "2px solid #c2c2a3", p: 2 }}>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", fontFamily: "Poppins" }}
          >
            This Men’s Green Solid Zippered Full-Zip Slim Fit Bomber Jacket is a
            perfect blend of comfort, functionality, and urban style. Designed
            for the modern man who values both fashion and practicality...
          </Typography>
        </Box>
      </Stack>

      {/* Related Products */}
      <RelatedProducts category={product.category} productID={productID} />
    </Box>
  );
};

export default Product;
