import { useState } from "react"
import { Box, Modal, Typography, TextField, Button } from "@mui/material"
import {  toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import config from "../config.js"
import Cookies from "js-cookie"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const OtpModal = ({ onClose, userId, page }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem("user_email")

  const handleVerify = async () => {
    if (!/^\d{4,6}$/.test(otp)) {
      setError("Enter a valid 6 digit OTP");
      return;
    }
    setError("");
    setLoading(true);
    const id = userId;
    console.log("userId", id);
    try {
      const res = await axios.post(`${config.baseURL}/verifyotp/${id}`, { email , otp},
      {
        headers : {
        Authorization: `Bearer ${Cookies.get("token")} `
      }
      }
    )
      if (res.status == 200) {
        if (page === "login") {
          toast.success(
            "Your account is verifed. Please try to login again",
            {
              position: "top-right",
              autoClose: 1500, 
            }
          );
        }
        setLoading(false)
        setTimeout(() => {
          navigate("/login")
           onClose()
        }, 1500)
      }
      setLoading(false)
      localStorage.removeItem("user_email")
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "OTP verification failed")
    }
  };

  return (
      <Modal open={true} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" color="primary" gutterBottom>
            OTP Verification
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter the OTP sent to your email
          </Typography>
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2 }}
            error={!!error}
            helperText={error}
            disabled={loading}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
  )
}

export default OtpModal
