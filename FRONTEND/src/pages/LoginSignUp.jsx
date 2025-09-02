import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";


const LoginSignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = useState("Login");
  const [fieldMenu, setFieldMenu] = useState(["email", "password"]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // login , signUp
  const handleLogin_Signup = async (e) => {
    e.preventDefault();
    console.log(formData);

    const endpoint =
      state === "Login"
        ? "https://e-commerce-backend-xnl1.onrender.com/login"
        : "https://e-commerce-backend-xnl1.onrender.com/signup";

    try {
      const res = await axios.post(endpoint, formData);
      const { success, message, token } = res.data;

      if (success) {
        localStorage.setItem("auth_token", token);

        // Save returnUrl for logout redirection
        localStorage.setItem("returnUrl", window.location.href);

        alert(message);

        // Decode token to get role
        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (role === "admin") {
          // Redirect admin to admin site and pass returnUrl
          const returnUrl = encodeURIComponent("https://e-commerce-users.onrender.com");
          window.location.replace(`https://e-commerce-admin-zvc5.onrender.com/?returnUrl=${returnUrl}`);
        } else if (role === "user") {
          // Redirect user to user home
          window.location.replace("https://e-commerce-users.onrender.com");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        alert(message || "Something went wrong.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Login/Signup error:", error);
    }
  };

  useEffect(() => {
    console.log(window.location.href);
    setFieldMenu(
      state === "Login"
        ? ["email", "password"]
        : ["username", "email", "password"]
    );
  }, [state]);

  return (
    <Box
      mt={2}
      sx={{
        marginBottom: "100px",
        display: "flex",
        justifyContent: "center",
        px: 2, // padding for mobile responsiveness
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: isMobile ? "80%" : 500,
          maxWidth: "100%",
          textAlign: "center",
          padding: isMobile ? 2 : 4,
          background: "white",
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          sx={{
            display: "inline-block",
            fontWeight: "bold",
            backgroundColor: "#ff3399",
            color: "white",
            borderRadius: "999px",
            px: 3,
            py: 1,
          }}
        >
          {state.toUpperCase()}
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin_Signup}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          {fieldMenu.map((field, index) => (
            <TextField
              key={index}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              type={field === "password" ? "password" : "text"}
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "999px",
                  backgroundColor: "white",
                  border: "2px solid black",
                  "& fieldset": { border: "none" },
                },
              }}
            />
          ))}

          {state == "Login" ? (
            <Typography fontWeight="bold" fontSize="14px">
              Don't have an account?{" "}
              <span
                style={{ color: "#ff3333", cursor: "pointer" }}
                onClick={() => {
                  setState("Sign Up");
                }}
              >
                Sign Up here
              </span>
            </Typography>
          ) : (
            <Typography fontWeight="bold" fontSize="14px">
              Already have an account?{" "}
              <span
                style={{ color: "#ff3333", cursor: "pointer" }}
                onClick={() => {
                  setState("Login");
                }}
              >
                Login here
              </span>
            </Typography>
          )}

          <FormControlLabel
            required
            control={<Checkbox sx={{ color: "#ff3333" }} />}
            label="By continuing, I agree to the terms of use & privacy policy"
            sx={{ alignSelf: "start" }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "50%",
              color: "white",
              backgroundColor: "#ff3333",
              borderRadius: "999px",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginSignUp;
