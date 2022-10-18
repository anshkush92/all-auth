// Test -------------------------- Importing the Packages ---------------------------------
import { Button } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const SubmitButton = (props) => {
  const { children } = props;

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#2b2828",
        "&:hover": { backgroundColor: "#161616" },
      }}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default SubmitButton;
