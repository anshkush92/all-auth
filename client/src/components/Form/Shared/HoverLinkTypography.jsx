// Test -------------------------- Importing the Packages ---------------------------------
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const HoverLinkTypography = (props) => {
  const navigate = useNavigate();

  const { link, children } = props;

  return (
    <Typography
      {...props}
      onClick={() => {
        navigate(`${link}`);
      }}
      sx={{
        "&:hover": {
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        },
      }}
    >
      {children}
    </Typography>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default HoverLinkTypography;
