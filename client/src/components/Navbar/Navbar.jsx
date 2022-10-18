// Test -------------------------- Importing the Packages ---------------------------------
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";

// Test -------------------------- Icons --------------------------------------------------
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MenuIcon from "@mui/icons-material/Menu";

// Test -------------------------- Importing the styles / other components ----------------
import AuthContext from "../../app/AuthContext/AuthContext";

import NavBarButtonsDesktop from "./NavBarButtonDesktop";
import NavBarButtonsMobile from "./NavBarButtonMobile";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";

// Test -------------------------- The current component ----------------------------------
const Navbar = () => {
  // Test ----------------- For imperative navigation ------------------------------------------------
  const navigate = useNavigate();

  // Test ----------------- For using the global State ----------------------------------------------
  const { isLogin } = useContext(AuthContext);

  // Test ----------------- State of the component ----------------------------------------------------
  // State for managing the Hamburger menu opening / closing (True ---> Open, False ---> Close)
  const [drawerStatus, setDrawerStatus] = useState(false);

  // Test ------------------- Functions for changing the states -----------------------------------------
  const toggleDrawer = () => {
    setDrawerStatus((previousState) => !previousState);
  };

  const closeDrawer = () => {
    setDrawerStatus(false);
  };

  // Test ------------------ The Actual Component --------------------------------------------------------
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2b2828",
        pl: { sm: "3%", md: "5%" },
        pr: { sm: "3%", md: "5%" },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* For the Hamburger Icon in the Mobile View */}
        <Box sx={{ display: { sm: "none" } }}>
          <IconButton onClick={toggleDrawer} sx={{ p: { xs: 0 } }}>
            <MenuIcon sx={{ color: "white", p: { xs: 0 } }}></MenuIcon>
          </IconButton>

          <Drawer anchor="left" open={drawerStatus} onClose={closeDrawer}>
            <NavBarButtonsMobile></NavBarButtonsMobile>
          </Drawer>
        </Box>

        {/* For the Icon and the Name of the App */}
        <Button
          sx={{ display: "flex", alignItems: "center", color: "white", p: 0 }}
          onClick={() => navigate("/")}
        >
          <AllInclusiveIcon sx={{ mr: 1 }}></AllInclusiveIcon>
          <Typography variant="h6">Auth</Typography>
        </Button>

        {/* For the Navbar Options in the Navbar in Desktop View */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: "20px", sm: "40px" },
          }}
        >
          <NavBarButtonsDesktop></NavBarButtonsDesktop>
        </Box>

        {/* For the Avatar and its Options when logged in */}
        {isLogin && (
          <Box sx={{ minWidth: { sm: "80px" }, textAlign: "center" }}>
            <UserMenu></UserMenu>
          </Box>
        )}

        {/* For the login button, to login */}
        {!isLogin && (
          <Box>
            <LoginButton></LoginButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Navbar;
