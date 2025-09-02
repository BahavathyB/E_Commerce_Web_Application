import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const PopularItems = () => {

  const allProducts = useSelector((state) => state.products.allProducts)

  const popularProducts = allProducts
  .filter((product) => product.category === "Women")
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);
  
  return (
    <Box mt="40px" px={{ xs: 2, md: 8 }}>
      {/* Title Section */}
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          POPULAR IN WOMEN
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
        {popularProducts.map((product) => (
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
            <CardActionArea>
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

export default PopularItems;
