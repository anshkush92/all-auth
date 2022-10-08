// Test -------------------------- Importing the Packages ---------------------------------
import { useReducer, useContext, useState } from "react";
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
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthContext from "../../app/AuthContext/AuthContext";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- Reducer Functions of the Component ---------------------
const userState = {
  showPassword: false,
  enteredEmail: "",
  enteredPassword: "",
};

const userStateReducer = (state, action) => {
  if (action.type === "SHOW-PASSWORD") {
    return {
      showPassword: !state.showPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: state.enteredPassword,
    };
  } else if (action.type === "ENTERED-EMAIL") {
    return {
      showPassword: state.showPassword,
      enteredEmail: action.email.trim(),
      enteredPassword: state.enteredPassword,
    };
  } else if (action.type === "ENTERED-PASSWORD") {
    return {
      showPassword: state.showPassword,
      enteredEmail: state.enteredEmail,
      enteredPassword: action.password.trim(),
    };
  } else if (action.type === "CLEAR-FORM") {
    return {
      showPassword: false,
      enteredEmail: "",
      enteredPassword: "",
    };
  }
};

// Test -------------------------- The current component ----------------------------------
const LoginForm = () => {
  // Test ----------------- States in the Component -------------------------
  // For the userState in the App
  const { loginHandler } = useContext(AuthContext);
  const [currentUserState, dispatch] = useReducer(userStateReducer, userState);
  const [isLoading, setIsLoading] = useState(false);
  const { enteredEmail, enteredPassword } = currentUserState;
  // Hook for imperative navigation for the routes
  const navigate = useNavigate();

  // Test -------------------- State Changing Function ----------------------
  const isFormValidHandler = async () => {
    if (enteredEmail === "" || enteredPassword === "") {
      toast.error("Please Enter all details");
    } else {
      setIsLoading(true);
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Converts JS object into JSON
        body: JSON.stringify({ enteredEmail, enteredPassword }),
      });

      // Expecting to receive JSON from the server
      // Converts the JSON in JS object
      const response = await data.json();
      console.log(currentUserState, response, response.error);

      if (response.error === undefined) {
        toast.success("User Logged in Successfully");
        dispatch({ type: "CLEAR-FORM" });
        loginHandler();
        navigate("/");
      } else {
        toast.error(response.error);
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
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
      )}
      {!isLoading && (
        <Card
          sx={{
            width: { xs: "90%", sm: "500px" },
            position: "absolute",
            top: "54%",
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
                Login
              </Typography>
              <Typography variant="body2">
                Enter your credentials to access your account
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

            {/* For dividing the Social Media Login and UserName Password Login */}
            <Divider textAlign="center">OR</Divider>

            {/* Contains the UserName, Password, Login, New Users Section */}
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel shrink htmlFor="email">
                    Email
                  </InputLabel>
                  <TextField
                    id="email"
                    size="small"
                    value={enteredEmail}
                    fullWidth
                    placeholder="Enter email"
                    onChange={(event) => {
                      dispatch({
                        type: "ENTERED-EMAIL",
                        email: event.target.value,
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
                    value={enteredPassword}
                    fullWidth
                    placeholder="Enter password"
                    type={`${
                      currentUserState.showPassword ? "text" : "password"
                    }`}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: "6px",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        "&:hover": {
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Forget Password ?
                    </Typography>
                  </Box>
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
                    Login
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
                    <Typography>Don't have a account ?</Typography>
                    <Typography
                      onClick={() => {
                        navigate("/signup");
                      }}
                      sx={{
                        "&:hover": {
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Sign Up
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default LoginForm;
