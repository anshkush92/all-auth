// Test -------------------------- Importing the Packages ---------------------------------
import { Box } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import Navbar from "../../components/Navbar/Navbar";
import LoginForm from "../../components/Form/LoginForm";

// Test -------------------------- The current component ----------------------------------
const Login = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <LoginForm></LoginForm>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Login;
