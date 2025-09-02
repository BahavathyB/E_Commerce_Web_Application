import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Kids", path: "/kids" },
];

const drawerItems = [
  { label: "Home", path: "/" },
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "Kids", path: "/kids" },
  { label: "Cart", path: "/cart" },
  { label: "Login", path: "/login" },
];

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 6 } }}>
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <img src={logo} alt="shopLogo" style={{ height: "40px" }} />
            <Typography variant="h6" fontWeight="bold" color="black">
              SHOPPER
            </Typography>
          </Stack>

          {/* Desktop Nav Links */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map(({ label, path }) => (
              <NavLink key={label} to={path} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <Button
                    variant="outlined"
                    sx={{
                      color: isActive ? "white" : "#ff3399",
                      borderColor: "#ff3399",
                      borderRadius: "999px",
                      backgroundColor: isActive ? "#ff3399" : "transparent",
                      "&:hover": {
                        backgroundColor: "#ff3399",
                        color: "white",
                      },
                    }}
                  >
                    {label}
                  </Button>
                )}
              </NavLink>
            ))}
          </Stack>

          {/* Right icons */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Cart Icon - always visible */}
            <Box  sx={{ display: { xs: "none", md: "block" } }}>
              <NavLink
                to="/cart"
                style={{ textDecoration: "none" }}
               
              >
                {({ isActive }) => (
                  <Badge
                    badgeContent={(cartItems || []).length}
                    color="warning"
                    showZero
                  >
                    <ShoppingCartOutlinedIcon
                      fontSize="large"
                      sx={{ color: isActive ? "#008ae6" : "black" }}
                    />
                  </Badge>
                )}
              </NavLink>
            </Box>

            {/* Login Button - only for desktop */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {localStorage.getItem("auth_token") ? 
              <Button
                    variant="outlined"
                    sx={{
                      color:"#ff3399",
                      borderColor: "#ff3399",
                      borderRadius: "999px",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "#ff3399",
                        color: "white",
                      },
                    }}

                    onClick={() => {
                      localStorage.removeItem("auth_token");
                      window.location.replace("/");
                    }}
                  >
                    Logout
                  </Button> :
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <Button
                    variant="outlined"
                    sx={{
                      color: isActive ? "white" : "#ff3399",
                      borderColor: "#ff3399",
                      borderRadius: "999px",
                      backgroundColor: isActive ? "#ff3399" : "white",
                      "&:hover": {
                        backgroundColor: "#ff3399",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </NavLink>
              }

              
            </Box>

            {/* Hamburger Icon - mobile only */}
            <IconButton
              edge="end"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: "#ff3399" }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 200, p: 2 }}>
          <List>
            {drawerItems.map(({ label, path }) => (
              <ListItem key={label} >
                <NavLink
                  to={path}
                  style={{ textDecoration: "none" }}
                  onClick={() => setDrawerOpen(false)}
                >
                  {({isActive}) => (
                    <Button
                    
                    variant="outlined"
                    sx={{
                      width: "100px",
                      color: isActive ? "white" : "#ff3399",
                      borderColor: "#ff3399",
                      borderRadius: "999px",
                      backgroundColor: isActive ? "#ff3399" : "white",
                      "&:hover": {
                        backgroundColor: "#ff3399",
                        color: "white",
                      },
                    }}
                    
                    >
                      {label != "Cart" ? label : `${label} (${cartItems.length})`}
                    </Button>
                  )}
                </NavLink>
              </ListItem>
            ))}

          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
