// Test -------------------------- Importing the Packages ---------------------------------
import { Box, InputLabel, TextField } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const Email = (props) => {
  const { id } = props;
  console.log({ ...props });

  return (
    <Box>
      <InputLabel shrink htmlFor={id}>
        Email
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
export default Email;
