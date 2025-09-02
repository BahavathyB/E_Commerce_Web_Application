import React, { useState } from "react";
import Sidebar from "../components/SideBar";
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
import { useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import upload_image from "../assets/upload_image.jpg";
import axios from "axios";

const AddProduct = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  let [image, setImage] = useState(null);

  let handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [productdetails, setProductDetails] = useState({
    name: "",
    image: "",
    new_price: 0,
    old_price: 0,
    category: "",
    rating: 0,
    description: "",
    tags: "",
  });

  let handleOnChange = (e) => {
    setProductDetails({ ...productdetails, [e.target.name]: e.target.value });
  };

  // adding product to db
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageRes = await axios.post(
        "http://localhost:3000/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = imageRes.data.url;
      console.log(imageUrl);

      const productData = { ...productdetails, image: imageUrl };

      const productRes = await axios.post(
        "http://localhost:3000/addproduct",
        productData
      );

      console.log("Product created:", productRes.data.message);


      setProductDetails({
        name: "",
        image: "",
        new_price: null,
        old_price: null,
        category: "",
        rating: 0,
        description: "",
        tags: "",
      });
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Stack direction="row" sx={{ minHeight: "100vh" }}>
        {/* Sidebar stays fixed left */}
        <Sidebar />

        {/* Main content area */}
        <Box
          sx={{ flex: 1, p: 3, ml: { xs: "15%", md: "400px"} }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "70%",
              textAlign: "center",
              p: 4,
              backgroundColor: "white",
              boxShadow: "0 0 10px #09fc97ff",
              borderRadius: 3,
              mb: "100px",
            }}
          >
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
              ADD NEW PRODUCT
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                label="Name"
                name="name"
                type="text"
                required
                fullWidth
                value={productdetails.name}
                onChange={handleOnChange}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="New Price"
                  name="new_price"
                  type="number"
                  required
                  fullWidth
                  value={productdetails.new_price}
                  onChange={handleOnChange}
                />
                <TextField
                  label="Old Price"
                  name="old_price"
                  type="number"
                  required
                  fullWidth
                  value={productdetails.old_price}
                  onChange={handleOnChange}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  required
                  value={productdetails.category}
                  sx={{width: "50%"}}
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
                    size={isMobile ? "medium" : "large"}
                    value={productdetails.rating}
                    sx={{width: "50%"}}
                    onChange={(e, newValue) => {
                      setProductDetails({
                        ...productdetails,
                        rating: newValue,
                      });
                    }}
                  />
                </Box>
              </Stack>

              <TextField
                label="Description"
                name="description"
                type="text"
                multiline
                rows={3}
                required
                fullWidth
                value={productdetails.description}
                onChange={handleOnChange}
              />

              <TextField
                label="Tags"
                name="tags"
                type="text"
                required
                fullWidth
                value={productdetails.tags}
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
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <label
                  htmlFor="file-input"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                >
                  <img
                    src={image ? URL.createObjectURL(image) : upload_image}
                    alt="upload"
                    style={{
                      height: "100%",
                      objectFit: "contain",
                      width: "100%",
                    }}
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
                type="button"
                sx={{
                  width: "50%",
                  alignSelf: "center",
                  color: "white",
                  backgroundColor: "#ff3399",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#e02684",
                  },
                }}
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Box>
          </Paper>
        </Box>
      </Stack>

      
    </div>
  );
};

export default AddProduct;
