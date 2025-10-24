import logo from "../assets/logo.PNG";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [authCheck, setAuthCheck] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // ✅ Initial check when component loads
  useEffect(() => {
    const token = Cookies.get("token");
    const isVerified = Cookies.get("isVerified");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuthCheck(true);
      setAdmin(isVerified === "true"); // Make sure it's boolean
      setUserData(JSON.parse(user));
    } else {
      setAuthCheck(false);
      setAdmin(false);
      setUserData(null);
    }
  }, []);

  // ✅ Toggle drawer
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // ✅ Logout function
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("isVerified");
    localStorage.removeItem("user");

    setAuthCheck(false);
    setAdmin(false);
    setUserData(null);

    navigate("/"); // Redirect after logout
  };

  // ✅ Menu items for Drawer (mobile)
  const menuItems = (
    <>
      {authCheck ? (
        <>
          <ListItem button component={Link} to="/" sx={{ color: "gray" }}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={
              admin
                ? `/admin/dashboard/${userData?.id}`
                : `/dashboard/${userData?.id}`
            }
            sx={{ color: "gray" }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={logout}
            sx={{ backgroundColor: "#005EB8", color: "#fff" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem
            button
            component={Link}
            to="/signup"
            sx={{ backgroundColor: "#005EB8", color: "#fff" }}
          >
            <ListItemText primary="Signup" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/login"
            sx={{ backgroundColor: "#005EB8", color: "#fff" }}
          >
            <ListItemText primary="Login" />
          </ListItem>
        </>
      )}
    </>
  );

  return (
    <>
      {/* ✅ Fixed logout button on top-right if logged in */}
      {authCheck && (
        <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 16px", // optional spacing from top and right
  }}
>
  <Button
    color="inherit"
    onClick={logout}
    sx={{
      backgroundColor: "#4CAF50",
      color: "#fff",
      fontSize: "0.75rem",
      padding: "4px 10px",
      "&:hover": { backgroundColor: "#4ccd51ff" },
    }}
  >
    Logout
  </Button>
</Box>

      )}

      {/* ✅ AppBar (visible when not logged in) */}
      {!authCheck && (
        <AppBar position="sticky" sx={{ width: "100%" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              marginLeft={3.6}
              color="#8BC441"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {/* HealthMat Pro */}
              <img
                src={logo}
                alt="Logo"
                style={{ height: 70, marginRight: 16 }}
              />
            </Typography>

            {/* Menu icon (mobile) */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Buttons for desktop */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{
                  marginRight: "18px",
                  bgcolor: "#4CAF50",
                  color: "white",
                  "&:hover": { backgroundColor: "#4ccd51ff" },
                }}
              >
                Signup
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  bgcolor: "#4CAF50",
                  color: "white",
                  "&:hover": { backgroundColor: "#4ccd51ff" },
                }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* ✅ Drawer for mobile view */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "60%",
          },
        }}
      >
        <Box
          sx={{ width: "100%" }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>{menuItems}</List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
