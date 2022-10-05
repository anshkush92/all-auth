// Test -------------------------- Importing the Packages ---------------------------------
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

// Test -------------------------- Icons --------------------------------------------------
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MenuIcon from "@mui/icons-material/Menu";

// Test -------------------------- Importing the styles / other components ----------------
import AuthContext from "../../app/AuthContext/AuthContext";

// Test -------------------------- The current component ----------------------------------
const Pages = ["News", "Weather", "Excuses"];
const Settings = ["Logout"];

const Navbar = () => {
  // Test ----------------- For imperative navigation ------------------------------------------------
  const navigate = useNavigate();

  // Test ----------------- For using the global State ----------------------------------------------
  const { isLogin, loginHandler, logoutHandler } = useContext(AuthContext);

  // Test ----------------- State of the component ----------------------------------------------------
  // State for opening / closing the Settings Menu
  const [anchorElUser, setAnchorElUser] = useState(null);
  // State for managing the Hamburger menu opening / closing (True ---> Open, False ---> Close)
  const [drawerStatus, setDrawerStatus] = useState(false);

  // Test ------------------- Functions for changing the states -----------------------------------------
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
            <List>
              {Pages.map((page, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => navigate(`/${page.toLowerCase()}`)}
                  >
                    {page}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
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
          {Pages.map((page, index) => (
            <Button
              key={index}
              variant="standard"
              sx={{ color: "white", p: 0, minWidth: 0 }}
              onClick={() => navigate(`/${page.toLowerCase()}`)}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* For the Avatar and its Options when logged in */}
        {isLogin && (
          <Box sx={{ minWidth: {sm: "80px"} }}>
            <Tooltip title="Open Settings" arrow>
              <IconButton onClick={handleOpenUserMenu} disableRipple>
                <Avatar
                  alt="Ansh Singh"
                  src="https://mui.com/static/images/avatar/2.jpg"
                ></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  borderRadius: 0.75,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              id="menu-appbar"
              keepMounted
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    logoutHandler();
                    navigate("/");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* For the login button, to login */}
        {!isLogin && (
          <Box>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                loginHandler();
                navigate("/");
              }}
              sx={{
                color: "white",
                minWidth: "80px",
                backgroundColor: "#299693",
                "&:hover": { backgroundColor: "#65aeac" },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Navbar;
