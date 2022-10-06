// Test -------------------------- Importing the Packages ---------------------------------
import { useReducer } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
  InputLabel,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- Reducer Functions of the Component ---------------------
const userState = {
  username: "",
  showPassword: false,
  showConfirmPassword: false,
  enteredEmail: "",
  enteredPassword: "",
  confirmPassword: "",
};

const userStateReducer = (state, action) => {
  if (action.type === "SHOW-PASSWORD") {
    return {
      username: state.username,
      showPassword: !state.showPassword,
      showConfirmPassword: state.showConfirmPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: state.enteredPassword,
      confirmPassword: state.confirmPassword,
    };
  } else if (action.type === "SHOW-CONFIRM-PASSWORD") {
    return {
      username: state.username,
      showPassword: state.showPassword,
      showConfirmPassword: !state.showConfirmPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: state.enteredPassword,
      confirmPassword: state.confirmPassword,
    };
  } else if (action.type === "ENTERED-EMAIL") {
    return {
      username: state.username,
      showPassword: state.showPassword,
      showConfirmPassword: state.showConfirmPassword,
      enteredEmail: action.Email.trim(),
      enteredPassword: state.enteredPassword,
      confirmPassword: state.confirmPassword,
    };
  } else if (action.type === "ENTERED-PASSWORD") {
    return {
      username: state.username,
      showPassword: state.showPassword,
      showConfirmPassword: state.showConfirmPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: action.password.trim(),
      confirmPassword: state.confirmPassword,
    };
  } else if (action.type === "CONFIRM-PASSWORD") {
    return {
      username: state.username,
      showPassword: state.showPassword,
      showConfirmPassword: state.showConfirmPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: state.enteredPassword,
      confirmPassword: action.confirmPassword.trim(),
    };
  } else if (action.type === "ENTERED-USERNAME") {
    return {
      username: action.username.trim(),
      showPassword: state.showPassword,
      showConfirmPassword: state.showConfirmPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: state.enteredPassword,
      confirmPassword: state.confirmPassword,
    };
  }
};

// Test -------------------------- The current component ----------------------------------
const SignupForm = () => {
  // For the userState in the App
  const [currentUserState, dispatch] = useReducer(userStateReducer, userState);
  console.log(currentUserState);

  const { username, enteredEmail, enteredPassword, confirmPassword } =
    currentUserState;

  const navigate = useNavigate();

  // Test ----------------- Form validation logic ------------
  const isFormValidHandler = () => {
    console.log("Sign up button clicked");
    if (
      username === "" ||
      enteredEmail === "" ||
      enteredPassword === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please enter all the details");
    } else if (enteredPassword !== confirmPassword) {
      toast.error("Password doesn't match");
    }
  };

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "500px" },
        position: "absolute",
        top: "55%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CardContent>
        {/* Heading and the subheading for the Card Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="700">
            Signup
          </Typography>
          <Typography variant="body2">
            Create your account to get Started
          </Typography>
        </Box>

        {/* The Grid container which contains the Social Media Login Buttons*/}
        <Box mt={2} mb={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
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
              >
                Facebook
              </Button>
            </Grid>
            <Grid item xs={6}>
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
              >
                Twitter
              </Button>
            </Grid>
            <Grid item xs={6}>
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
              >
                Github
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* For dividing the Social Media Login and Email Password Login */}
        <Divider textAlign="center">OR</Divider>

        {/* Contains the Email, Password, Login, New Users Section */}
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="username">
                Username
              </InputLabel>
              <TextField
                id="username"
                size="small"
                fullWidth
                placeholder="Enter username"
                onChange={(event) => {
                  dispatch({
                    type: "ENTERED-USERNAME",
                    username: event.target.value,
                  });
                }}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <InputLabel shrink htmlFor="Email">
                Email
              </InputLabel>
              <TextField
                id="Email"
                size="small"
                fullWidth
                placeholder="Enter Email"
                onChange={(event) => {
                  dispatch({
                    type: "ENTERED-EMAIL",
                    Email: event.target.value,
                  });
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <InputLabel shrink htmlFor="password">
                Password
              </InputLabel>
              <TextField
                id="password"
                size="small"
                fullWidth
                placeholder="Enter password"
                type={`${currentUserState.showPassword ? "text" : "password"}`}
                onChange={(event) => {
                  dispatch({
                    type: "ENTERED-PASSWORD",
                    password: event.target.value,
                  });
                }}
                InputProps={{
                  endAdornment: currentUserState.showPassword ? (
                    <VisibilityIcon
                      onClick={() => dispatch({ type: "SHOW-PASSWORD" })}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    ></VisibilityIcon>
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => dispatch({ type: "SHOW-PASSWORD" })}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    ></VisibilityOffIcon>
                  ),
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <InputLabel shrink htmlFor="confirm-password">
                Confirm Password
              </InputLabel>
              <TextField
                id="confirm-password"
                size="small"
                fullWidth
                placeholder="Confirm your password"
                type={`${
                  currentUserState.showConfirmPassword ? "text" : "password"
                }`}
                onChange={(event) => {
                  dispatch({
                    type: "CONFIRM-PASSWORD",
                    confirmPassword: event.target.value,
                  });
                }}
                InputProps={{
                  endAdornment: currentUserState.showConfirmPassword ? (
                    <VisibilityIcon
                      onClick={() =>
                        dispatch({ type: "SHOW-CONFIRM-PASSWORD" })
                      }
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    ></VisibilityIcon>
                  ) : (
                    <VisibilityOffIcon
                      onClick={() =>
                        dispatch({ type: "SHOW-CONFIRM-PASSWORD" })
                      }
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    ></VisibilityOffIcon>
                  ),
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2b2828",
                  "&:hover": { backgroundColor: "#161616" },
                }}
                fullWidth
                onClick={isFormValidHandler}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Typography>Already have an account ?</Typography>
                <Typography
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    "&:hover": {
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  Login
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default SignupForm;
