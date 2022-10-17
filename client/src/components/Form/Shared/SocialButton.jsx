// Test -------------------------- Importing the Packages ---------------------------------
import { Button } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const SocialButton = (props) => {
  const { children } = props;

  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        minWidth: { xs: "80px", sm: "105px" },
        backgroundColor: "#299693",
        color: "white",
        borderColor: "transparent",
        "&:hover": {
          backgroundColor: "#65aeac",
          borderColor: "transparent",
        },
      }}
      onClick={() => console.log(`${children} Button Clicked`)}
    >
      {children}
    </Button>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default SocialButton;
