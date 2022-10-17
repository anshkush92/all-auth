// Test -------------------------- Importing the Packages ---------------------------------
import { Box } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import Navbar from "../../components/Navbar/Navbar";
import SignupForm from "../../components/Form/SignupForm";

// Test -------------------------- The current component ----------------------------------
const Signup = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <SignupForm></SignupForm>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Signup;
