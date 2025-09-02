import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";

const NewCollections = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const allProducts = useSelector((state) => state.products.allProducts)
  const latestProducts = [...allProducts].reverse().slice(0, 8);
  
  

  return (
    <Box mt={5} px={{ xs: 2, md: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          LATEST COLLECTIONS
        </Typography>
        <Box
          sx={{
            width: "300px",
            height: "5px",
            backgroundColor: "black",
            margin: "10px auto",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {latestProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: {
                xs: "100%",      // Full width on mobile
                sm: "45%",       // Two per row on tablets
                md: "22%",       // Four per row on desktop
              },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#ffe6ff",
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  noWrap={!isMobile}
                >
                  {product.name}
                </Typography>
                <Stack mt={2} direction="row" justifyContent="space-between">
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

export default NewCollections;
