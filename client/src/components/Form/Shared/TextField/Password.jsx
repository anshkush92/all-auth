// Test -------------------------- Importing the Packages ---------------------------------
import { Box, InputLabel, TextField } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const Password = (props) => {
  const { id, value, onChange, onClick, visibilityStatus } = props;

  console.log({ ...props });

  return (
    <Box>
      <InputLabel shrink htmlFor={id}>
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </InputLabel>
      <TextField
        id={id}
        size="small"
        value={value}
        fullWidth
        placeholder={`Enter ${id}`}
        type={`${visibilityStatus ? "text" : "password"}`}
        onChange={onChange}
        InputProps={{
          endAdornment: visibilityStatus ? (
            <VisibilityIcon
              onClick={onClick}
              sx={{ "&:hover": { cursor: "pointer" } }}
            ></VisibilityIcon>
          ) : (
            <VisibilityOffIcon
              onClick={onClick}
              sx={{ "&:hover": { cursor: "pointer" } }}
            ></VisibilityOffIcon>
          ),
        }}
      ></TextField>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Password;
