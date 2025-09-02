import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NewsLetter = () => {
  let [data, setData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NewsLetterData: ", data);
  };

  return (
    <Box px={2}>
      <Paper
        elevation={6}
        sx={{
          maxWidth: "60%",
          margin: "100px auto",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle, rgb(243, 231, 234), rgb(245, 200, 221))",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Get Exclusive Offers On Your Email
        </Typography>
        <Typography variant="h6" textAlign="center">
          Subscribe to our Newsletter and stay updated
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                "& fieldset": {
                  border: "none",
                },
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            fullWidth
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                "& fieldset": {
                  border: "none",
                },
                backgroundColor: "white",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "999px",
              backgroundColor: "#ff3333",
              color: "white",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewsLetter;
