// Test -------------------------- Importing the Packages ---------------------------------
import { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Test -------------------------- Importing the styles / other components ----------------
import UserContext from "../../app/UserContext/User.context";

const Settings = ["Logout"];
// Test -------------------------- The current component ----------------------------------
const UserMenu = () => {
  // Context Store
  const { user, removeValidUser } = useContext(UserContext);

  // State for opening / closing the Settings Menu
  const [anchorElUser, setAnchorElUser] = useState(null);

  // For navigation in the APP
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open Settings" arrow>
        <IconButton onClick={handleOpenUserMenu} disableRipple>
          <Avatar alt={user?.name || "Test"} sx={{ backgroundColor: "black" }}>
            {user?.name.toUpperCase()}
          </Avatar>
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
              removeValidUser();
              navigate("/login");
              handleCloseUserMenu();
              toast.success("Logged Out Successfully");
            }}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default UserMenu;
