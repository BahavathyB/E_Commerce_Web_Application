import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopCategory = (props) => {

  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.products.allProducts)

  const filteredProducts = Array.isArray(allProducts)
  ? allProducts.filter((product) => product.category === props.category)
  : [];



  return (
    <Box>
      {/* Banner Image */}
      <Box mt={2}>
        <img
          src={props.banner}
          alt="banner"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
        />
      </Box>

      {/* Info and Sort Section */}
      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Stack flexDirection="row">
          <Typography fontWeight="bold">Showing 1–12 ... </Typography>
          <Typography component="span">
            out of {filteredProducts.length} products
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          sx={{
            color: "#ff3399",
            backgroundColor: "white",
            borderColor: "#ff3399",
            borderRadius: "999px",
          }}
        >
          sort by <ArrowDropDownIcon />
        </Button>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          mt: 4,
          mb: 4,
        }}
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: {
                xs: "80%",
                sm: "45%",
                md: "22%",
              },
              m: "auto",

              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffe6ff",
                transform: "scale(1.05)",
              },
            }}
          >
            <CardActionArea
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/product/${product.id}`);
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {product.name}
                </Typography>
                <Stack mt={2} direction="row" spacing={2}>
                  <Typography variant="h6" fontWeight="bold">
                    ₹{product.new_price}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{product.old_price}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Explore More Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e0e0d1",
            color: "black",
            fontWeight: "bold",
            borderRadius: "999px",
            px: 4,
            py: 1,
            "&:hover": {
              backgroundColor: "#d6d6c2",
            },
          }}
        >
          Explore more
        </Button>
      </Box>
    </Box>
  );
};

export default ShopCategory;
