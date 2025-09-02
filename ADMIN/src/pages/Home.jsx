import { Box, Paper, Stack, Typography } from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Sidebar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://e-commerce-backend-xnl1.onrender.com/allproducts");
      setAllProducts(res.data.allProducts || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  let [returnUrl, setReturnUrl] = useState("");

  useEffect(() => {
  fetchAllProducts();
  const params = new URLSearchParams(window.location.search);
  const url = params.get("returnUrl");

  if (url) {
    setReturnUrl(url);
    localStorage.setItem("returnUrl", url);
  } else {
   
    const storedUrl = localStorage.getItem("returnUrl");
    if (storedUrl) setReturnUrl(storedUrl);
  }
}, []);

  // Count products by category
  const totalCount = allProducts.length;
  const menCount = allProducts.filter((p) => p.category === "Men").length;
  const womenCount = allProducts.filter((p) => p.category === "Women").length;
  const kidsCount = allProducts.filter((p) => p.category === "Kids").length;

  return (
    <div>
      <Stack direction="row" sx={{ minHeight: "100vh", }}>
        <Sidebar/>
        <Box sx={{ flex: 1, p: 3, ml: { xs: 0, md: "240px"} }}>
          <Typography variant="h3" fontWeight="bold" mb={3} textAlign="center"> 
            DASHBOARD
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  padding: "5px 20px",
                  display: "inline-block",
                  backgroundColor: "#ff3333ff",
                  color: "white",
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                TOTAL PRODUCTS - {totalCount}
              </Typography>
            </Box>

            <Stack direction="row" flexWrap="wrap" gap={3} justifyContent="center">
              <Paper
                elevation={6}
                sx={{
                  width: "25%",
                  height: "50vh",
                  backgroundColor: "white",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 0 10px #09fc97ff",
                }}
              >
                <ManIcon
                  sx={{
                    fontSize: "100px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "4px solid #09fc97ff"
                  }}
                />
                <Typography variant="h4" fontWeight="bold">
                  MEN
                </Typography>
                <Typography variant="h2" fontWeight="bold" sx={{color: "#ff3333ff"}}>
                  {menCount}
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  width: "25%",
                  height: "50vh",
                  backgroundColor: "white",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 0 10px #09fc97ff",
                }}
              >
                <WomanIcon
                  sx={{
                    fontSize: "100px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "4px solid #09fc97ff"
                  }}
                />
                <Typography variant="h4" fontWeight="bold">
                  WOMEN
                </Typography>
                <Typography variant="h2" fontWeight="bold" sx={{color: "#ff3333ff"}}>
                  {womenCount}
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  width: "25%",
                  height: "50vh",
                  backgroundColor: "white",
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 0 10px #09fc97ff",
                }}
              >
                <SportsHandballIcon
                  sx={{
                    fontSize: "100px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "4px solid #09fc97ff"
                  }}
                />
                <Typography variant="h4" fontWeight="bold">
                  KIDS
                </Typography>
                <Typography variant="h2" fontWeight="bold" sx={{color: "#ff3333ff"}}>
                  {kidsCount}
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default Home;
