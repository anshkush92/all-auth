// Test -------------------------- Importing the Packages ---------------------------------
import { useReducer, useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
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
import AuthContext from "../../app/AuthContext/AuthContext";
import HoverLinkTypography from "./Shared/HoverLinkTypography";
import SubmitButton from "./Shared/SubmitButton";
import SocialButton from "./Shared/SocialButton";
import LoadingBar from "./Shared/LoadingBar";

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
      ...state,
      showPassword: !state.showPassword,
    };
  } else if (action.type === "ENTERED-EMAIL") {
    return {
      ...state,
      enteredEmail: action.email.trim(),
    };
  } else if (action.type === "ENTERED-PASSWORD") {
    return {
      ...state,
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
const SocialButtonData = ["Google", "Facebook", "Twitter", "Github"];

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
      console.log(
        "Current User State",
        currentUserState,
        "Response",
        response,
        "Response Error",
        response.error
      );

      // Storing the token in the localStorage of the browsre
      if (response.status === 201 || response.status === 200) {
      }

      if (response.error === undefined) {
        console.log(
          "Setting auth Token in the Local Storage",
          response.result.jwtToken
        );
        localStorage.setItem("jwtAuthToken", response.result.jwtToken);
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
      {isLoading && <LoadingBar></LoadingBar>}
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
                {SocialButtonData.map((data, index) => (
                  <Grid item xs={6} key={index}>
                    <SocialButton>{data}</SocialButton>
                  </Grid>
                ))}
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
                    <HoverLinkTypography link="#forget-password">
                      Forget Password ?
                    </HoverLinkTypography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton onClick={isFormValidHandler}>
                    Login
                  </SubmitButton>
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
                    <HoverLinkTypography link="/signup">
                      Sign Up
                    </HoverLinkTypography>
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
