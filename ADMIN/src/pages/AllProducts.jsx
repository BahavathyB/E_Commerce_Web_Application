import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import {
  Box,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  TableHead,
  TableBody,
} from "@mui/material";

import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateProduct from "../components/UpdateProduct";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allproducts");
      setAllProducts(res.data.allProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  console.log(allProducts);

  let handleDeleteProduct = async (id) => {
    console.log("productID: ", id);
    try {
      let res = await axios.delete(`http://localhost:3000/deleteproduct/:id`);

      console.log("Product deleted successfully:", res.data.message);

      fetchAllProducts();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div>
      <Stack direction="row" sx={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Product Table Area */}
        <Box sx={{ flex: 1, p: 3, ml: { xs: 0, md: "240px" } }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            ALL PRODUCTS
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0 0 10px #09fc97ff", width: "100%"}}
          >
            <Table aria-label="product table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {["Product", "Title", "New Price", "Category", "Edit", "Delete"].map(
                    (head, i) => (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{ fontWeight: "bold" }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {allProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="center">
                      <img
                        src={product.image}
                        alt="product"
                        style={{ width: 70, height: 100, objectFit: "contain" }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </TableCell>
                    <TableCell align="center">${product.new_price}</TableCell>

                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">
                      <EditDocumentIcon
                        color="secondary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditingProductId(product.id);
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <DeleteOutlineIcon
                        color="error"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteProduct(product.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
      {editingProductId && (
        <UpdateProduct
          productId={editingProductId}
          onClose={() => setEditingProductId(null)}
          onSuccess={fetchAllProducts}
          allProducts= {allProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
