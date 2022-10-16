// Test -------------------------- Importing the Packages ---------------------------------
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import ExcuseAPI from "../../components/API/Excuse/ExcuseAPI";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const Excuses = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <ExcuseAPI></ExcuseAPI>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Excuses;
