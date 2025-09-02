import React from "react";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const footerItems = ["Company", "Products", "Offices", "About", "Contact"];

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100",
        py: 4,
        px: { xs: 2, sm: 5 },
        backgroundColor: "#f9f9f9",
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      {/* Logo & Brand */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <img src={logo} alt="shopLogo" style={{ height: 60 }} />
        <Typography variant="h5" fontWeight="bold">
          SHOPPER
        </Typography>
      </Stack>

      {/* Footer Links */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={isMobile ? 2 : 4}
        flexWrap="wrap"
        mt={3}
      >
        {footerItems.map((label, index) => (
          <NavLink
            key={index}
            to="/"
            style={{
              textDecoration: "none",
              color: "#595959",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 500,
            }}
          >
            {label}
          </NavLink>
        ))}
      </Stack>

      {/* Social Icons */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
        mt={3}
        flexWrap="wrap"
      >
        <InstagramIcon fontSize="large" sx={{ color: "#595959" }} />
        <PinterestIcon fontSize="large" sx={{ color: "#595959" }} />
        <WhatsAppIcon fontSize="large" sx={{ color: "#595959" }} />
      </Stack>

      {/* Divider */}
      <Box mt={3} mb={1} sx={{display: "flex", justifyContent: "center"}}>
        <hr style={{ width: "90%", height: "2px", border: "none", backgroundColor: "#ccc" }} />
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color="#595959">
        © 2025 - All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
