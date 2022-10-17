// Test -------------------------- Importing the Packages ---------------------------------
import { CircularProgress } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const LoadingBar = () => {
  return (
    <CircularProgress
      size="50px"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: "1000",
      }}
    ></CircularProgress>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default LoadingBar;
