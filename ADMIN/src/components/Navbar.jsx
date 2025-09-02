import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const navbarHeight = 70;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const menuItems = [
    { label: "All Products", path: "/all-products" },
    { label: "Add Product", path: "/add-products" },
  ];

  const isActive = (path) => location.pathname === path;


  const handleLogout = () => {

    localStorage.removeItem("auth_token");
    window.location.replace(localStorage.getItem("returnUrl"));
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        sx={{
          backgroundColor: "white",
          boxShadow: "0 4px 10px -2px #ff3399",
          height: navbarHeight,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 6 } }}>
          {/* Left */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              sx={{ color: "#ff3399", display: { md: "none" } }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>

            <img src={logo} alt="shopLogo" style={{ height: "40px" }} />
            <Typography variant="h6" fontWeight="bold" color="#ff3399">
              SHOPPER
            </Typography>
          </Stack>

          {/* Right */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                color: "#ff3399",
                borderColor: "#ff3399",
                border: "2px solid",
                borderRadius: "999px",
                "&:hover": {
                  backgroundColor: "#ff3399",
                  color: "white",
                },
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Admin Panel
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#ff3399",
                borderColor: "#ff3399",
                borderRadius: "999px",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#ff3399",
                  color: "white",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Dropdown Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#0a0a0aff",
            p: 1,
            borderRadius: 2,
            boxShadow: "0 0 10px 2px #ff3399",
          },
        }}
        sx={{ mt: "40px" }}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                handleMenuClose();
              }}
              sx={{
                minWidth: "120px",
                color: isActive(item.path) ? "white" : "#ff3399",
                backgroundColor: isActive(item.path)
                  ? "#ff3399"
                  : "transparent",
                borderColor: "#ff3399",
                border: "2px solid",
                borderRadius: "999px",
                "&:hover": {
                  backgroundColor: "#ff3399",
                  color: "white",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default NavBar;
