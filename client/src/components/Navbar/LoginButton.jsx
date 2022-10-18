// Test -------------------------- Importing the Packages ---------------------------------
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={() => {
        navigate("/login");
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
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default LoginButton;
