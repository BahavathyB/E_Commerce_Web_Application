import React, { useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/cartSlice";
import { deleteFromCart, reduceCartItem, resetCart } from "../store/cartServices";


const Cart = () => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCartDelete = async (id) => {
  await deleteFromCart(id);
  dispatch(fetchCartItems());
};
  
const handleCartReduce = async (id) => {
  await reduceCartItem(id);
  dispatch(fetchCartItems());
};

const handleCartReset = async () => {
  await resetCart();
  dispatch(fetchCartItems());
};

  return (
    <Box px={{ xs: 2, md: 5 }}>
      {/* Reset Button */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography fontWeight="bold">Reset Cart:</Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "999px" }}
          onClick = {() => {handleCartReset()}}
        >
          Reset
        </Button>
      </Box>

      {/* Cart Table */}
      <Box sx={{ overflowX: "auto", my: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="cart table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["Product", "Title", "Price", "Quantity", "Total", "Reduce", "Delete"].map((head, i) => (
                  <TableCell key={i} align="center" sx={{ fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(cartItems || []).map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 70, height: 100, objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">₹{item.new_price}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    ₹{item.quantity * item.new_price}
                  </TableCell>
                  <TableCell align="center">
                    <RemoveCircleIcon
                      color="warning"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {handleCartReduce(item.id)}}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteOutlineIcon
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {handleCartDelete(item.id)}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Totals & Promo */}
      <Box sx={{ mt: 4, mb: 10 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-around"
          spacing={4}
          flexWrap="wrap"
        >
          {/* Totals */}
          <Stack spacing={2} width={{ xs: "100%", md: "45%" }}>
            <Typography variant="h6" fontWeight="bold">
              Cart Totals
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Sub Total</TableCell>
                    <TableCell>₹{totalAmount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shipping</TableCell>
                    <TableCell>Free</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      ₹{totalAmount}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          {/* Promo Code */}
          <Stack spacing={2} width={{ xs: "100%", md: "40%" }}>
            <Typography>If you have a promo code, enter it here:</Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Promo Code"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "999px",
                    "& fieldset": {
                      border: "1px solid black",
                    },
                  },
                  input: { padding: "8px 12px" },
                }}
              />
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: "999px" }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Cart;
