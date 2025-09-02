import React from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import hero_image from "../assets/hero_image.png";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mt: "15px",
        width: "100",
        minHeight: "600px",
        backgroundColor: "#ffe6ff",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, md: 0 },
        gap: 4,
      }}
    >
      {/* Left Text Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: { xs: "100%", md: "50%" } }}>
        <Typography variant="h6" fontWeight="bold" textAlign={{ xs: "center", md: "left" }}>
          NEW ARRIVALS ONLY
        </Typography>

        <Box
          sx={{
            p: 3,
            backgroundColor: "#ff8533",
            borderRadius: "20px",
            boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.6)",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant={isMobile ? "h5" : "h2"}>New collections</Typography>
          <Typography variant={isMobile ? "h5" : "h2"}>for everyone ❤️</Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#ff3333",
            borderRadius: "999px",
            width: "fit-content",
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
            alignSelf: { xs: "center", md: "flex-start" },
          }}
        >
          Latest Collections&nbsp; <ArrowRightAltIcon />
        </Button>
      </Box>

      {/* Right Image Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={hero_image}
          alt="hero"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
