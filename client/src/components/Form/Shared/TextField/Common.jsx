// Test -------------------------- Importing the Packages ---------------------------------
import { Box, InputLabel, TextField } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
// A small fullWidth TextField for having the Email
const Common = (props) => {
  const { id } = props;
  console.log({ ...props });

  return (
    <Box>
      <InputLabel shrink htmlFor={id}>
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </InputLabel>
      <TextField
        {...props}
        size="small"
        fullWidth
        placeholder={`Enter ${id}`}
      ></TextField>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Common;
