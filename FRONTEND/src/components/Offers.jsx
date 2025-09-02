import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import React from "react";
import exclusive_image from "../assets/exclusive_image.png";

const Offers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100",
        height: { xs: "auto", md: "500px" },
        m: { xs: "50px 20px", md: "100px 120px" },
        background: "radial-gradient(circle,rgb(243, 231, 234),rgb(245, 200, 221))",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "20px",
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 0 },
        gap: 4,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {/* Left Text Content */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
          Exclusive
        </Typography>
        <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
          offers for you
        </Typography>
        <Typography variant="h6">ONLY ON BEST SELLERS PRODUCTS</Typography>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#ff3333",
            borderRadius: "999px",
            width: "fit-content",
            px: 3,
            py: 1,
            alignSelf: { xs: "center", md: "flex-start" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Check Now <ArrowRightAltIcon />
        </Button>
      </Box>

      {/* Right Image */}
      <Box>
        <img
          src={exclusive_image}
          alt="exclusive"
          style={{
            width: isMobile ? "80%" : "400px",
            maxWidth: "80%",
            height: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default Offers;
