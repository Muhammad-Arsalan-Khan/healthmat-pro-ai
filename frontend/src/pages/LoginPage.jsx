import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validation/loginSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpModal from "../model/otp";
import config from "../config.js";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cnic: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(`${config.baseURL}/login`, data)
      // console.log(res)
      const userData = res.data.user
      localStorage.setItem("user", JSON.stringify(userData))
      // console.log(userData.isVerified)
      if (userData.isVerified) {
        setSnackbar({
          open: true,
          message: "Login successful",
          severity: "success",
        });
        if (userData.isAdmin) {
          setTimeout(() => {
            Cookies.set("token", res.data.token);
            Cookies.set("isVerified", res.data.Verified);
            navigate(`/admin/dashboard/${userData.id}`);
          }, 1500);
        } else {
          setTimeout(() => {
            Cookies.set("token", res.data.token)
            navigate(`/dashboard/${userData.id}`)
          }, 1000);
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false)
      if (err.response?.data?.message == "unAuthorized user") {
        console.log(err)
        const email = err.response?.data?.email
        localStorage.setItem("user_email", email)
        setUserId(err.response?.data?.data)
        setSnackbar({
          open: true,
          message: "Please verify your account via OTP try to login again",
          severity: "warning",
        })
        setShowOtpModal(true)
      }
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message || "Login failed. Check credentials.",
        severity: "error",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: { xs: "90%", sm: 450 },
        mx: "auto",
        mt: { xs: 3, sm: 5 },
      }}
      >
      <Typography variant="h5" color="#4CAF50" gutterBottom>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
        ].map((field) => (
          <Box key={field.name} mb={2}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type || "text"}
                  {...controllerField}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2,bgcolor: "#4CAF50", color: "white", "&:hover": { backgroundColor: "#4ccd51ff" }, }}
          disabled={loading}
        >
          Login
        </Button>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{" "}
            <Link href="/signup" underline="hover" color="#4CAF50">
              Signup
            </Link>
          </Typography>
        </Box>
      </Box>

      {showOtpModal && (
        <OtpModal
          onClose={() => setShowOtpModal(false)}
          userId={userId}
          page={"login"}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LoginPage
