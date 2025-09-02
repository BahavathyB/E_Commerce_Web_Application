import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RelatedProducts = (props) => {
  const { category, productID } = props;
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.allProducts);

  // Filter 4 related items with same category and different ID
  const related_products = allProducts
    .filter(
      (item) => Number(productID) !== item.id && category === item.category
    )
    .slice(0, 4);


  return (
    <Box mt="40px" mb="100px" px={{ xs: 2, md: 8 }}>
          {/* Title Section */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              RELATED PRODUCTS
            </Typography>
            <Box
              sx={{
                width: 300,
                height: "5px",
                backgroundColor: "black",
                mx: "auto",
                my: 1,
              }}
            />
          </Box>
    
          {/* Product Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              mt: 4,
            }}
          >
            {related_products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  width: { xs: "90%", sm: "45%", md: "22%" },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ffe6ff",
                    transform: "scale(1.1)",
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
        </Box>
  );
};

export default RelatedProducts;
