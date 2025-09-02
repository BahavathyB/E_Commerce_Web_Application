import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarWidth = 200;
const navbarHeight = 70;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: "All Products", path: "/all-products" },
    { label: "Add Product", path: "/add-products" },
  ];

  return (
    <Box
      sx={{
        width: 200,
        height: "100vh",
        position: "fixed",
        top: 70,
        left: 0,
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "4px 0 10px -2px #ff3399",
        pt: 4,
        display: {xs:"none", md: "block" },
      }}
    >
      <Stack spacing={4} alignItems="center">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            fullWidth
            variant="outlined"
            onClick={() => navigate(item.path)}
            sx={{
              color: isActive(item.path) ? "white" : "#ff3399",
              backgroundColor: isActive(item.path) ? "#ff3399" : "transparent",
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
      </Stack>
    </Box>
  );
};

export default Sidebar;
