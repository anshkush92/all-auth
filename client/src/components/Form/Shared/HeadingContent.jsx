// Test -------------------------- Importing the Packages ---------------------------------
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const HeadingContent = (props) => {
  const { heading, children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" fontWeight="700">
        {heading}
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default HeadingContent;
