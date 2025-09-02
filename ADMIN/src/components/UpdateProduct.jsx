import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import upload_image from "../assets/upload_image.jpg";
import axios from "axios";

const UpdateProduct = ({ productId, onClose, onSuccess }) => {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    id:0,
    name: "",
    image: "",
    new_price: 0,
    old_price: 0,
    category: "",
    rating: 0,
    description: "",
    tags: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/get/${productId}`);
        const product = res.data.product;
        console.log(res.data);
        
        setProductDetails({
          id: product.id || 0,
          name: product.name || "",
          image: product.image || "",
          new_price: product.new_price || 0,
          old_price: product.old_price || 0,
          category: product.category || "",
          rating: product.rating || 0,
          description: product.description || "",
          tags: product.tags || "",
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  console.log(productDetails);
  

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleOnChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async () => {
    try {
      let updatedProduct = { ...productDetails };

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imageRes = await axios.post("http://localhost:3000/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updatedProduct.image = imageRes.data.url;
      }

      console.log("Update image: ", updatedProduct.image);
      

      const response = await axios.put(`http://localhost:3000/product/:id`, updatedProduct);
      console.log("Update product: ", response.data.message)

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "80px", // below navbar
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        width: "100%",
        maxWidth: "700px",
        px: 2,
        mb: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 3,
          position: "relative",
          boxShadow: "0 4px 10px #ff3399",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: 20,
            color: "#888",
            "&:hover": { color: "#ff3399" },
          }}
        >
          ✕
        </Button>

        <Typography
          variant="h5"
          mb={3}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#ff3399",
            color: "white",
            borderRadius: "999px",
            px: 4,
            py: 1,
            display: "inline-block",
          }}
        >
          UPDATE PRODUCT
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={productDetails.name}
            onChange={handleOnChange}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="New Price"
              name="new_price"
              type="number"
              required
              fullWidth
              value={productDetails.new_price}
              onChange={handleOnChange}
            />
            <TextField
              label="Old Price"
              name="old_price"
              type="number"
              required
              fullWidth
              value={productDetails.old_price}
              onChange={handleOnChange}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Category"
              name="category"
              required
              fullWidth
              value={productDetails.category || ""}
              onChange={handleOnChange}
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
            </TextField>

            <Box
              sx={{
                border: "1px solid #c4c4c4",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography mr={2} fontWeight="bold">
                Rating
              </Typography>
              <Rating
                name="rating"
                size="large"
                value={productDetails.rating || 0}
                onChange={(e, newValue) =>
                  setProductDetails({ ...productDetails, rating: newValue })
                }
              />
            </Box>
          </Stack>

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            required
            fullWidth
            value={productDetails.description}
            onChange={handleOnChange}
          />

          <TextField
            label="Tags"
            name="tags"
            fullWidth
            required
            value={productDetails.tags}
            onChange={handleOnChange}
          />

          <Box
            sx={{
              width: "50%",
              height: 100,
              border: "2px dashed #ccc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              backgroundColor: "#f9f9f9",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <label htmlFor="file-input" style={{ width: "100%", height: "100%", cursor: "pointer" }}>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : productDetails.image || upload_image
                }
                alt="upload"
                style={{ height: "100%", objectFit: "contain", width: "100%" }}
              />
            </label>
            <input
              type="file"
              id="file-input"
              name="image"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              width: "50%",
              alignSelf: "center",
              color: "white",
              backgroundColor: "#ff3399",
              borderRadius: "999px",
              fontWeight: "bold",
              mt: 2,
              "&:hover": { backgroundColor: "#e02684" },
            }}
            onClick={handleUpdateProduct}
          >
            Update Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateProduct;
