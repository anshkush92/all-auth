// Test -------------------------- Importing the Packages ---------------------------------
import { useContext } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import Navbar from "../../components/Navbar/Navbar";

import AuthContext from "../../app/AuthContext/AuthContext";
import UserContext from "../../app/UserContext/User.context";

// Test -------------------------- The current component ----------------------------------
const Home = () => {
  const { isLogin } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <Box>
      <Navbar></Navbar>
      {isLogin && (
        <>
          <Typography variant="h6">Name : {user?.name}</Typography>
          <Typography variant="h6">Email : {user?.email}</Typography>
        </>
      )}
      {!isLogin && (
        <Typography variant="body1">
          User is not Logged In, Log In to access all functionalities
        </Typography>
      )}
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Home;
