// Test -------------------------- Importing the Packages ---------------------------------
import { useReducer } from "react";
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

// Test -------------------------- Importing the styles / other components ----------------
import useLoading from "../../hooks/useLoading";
import HoverLinkTypography from "./Shared/HoverLinkTypography";
import SubmitButton from "./Shared/SubmitButton";
import SocialButton from "./Shared/SocialButton";
import LoadingBar from "./Shared/LoadingBar";
import HeadingContent from "./Shared/HeadingContent";
import Common from "./Shared/TextField/Common";

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
      ...state,
      showPassword: !state.showPassword,
    };
  } else if (action.type === "SHOW-CONFIRM-PASSWORD") {
    return {
      ...state,
      showConfirmPassword: !state.showConfirmPassword,
    };
  } else if (action.type === "ENTERED-EMAIL") {
    return {
      ...state,
      enteredEmail: action.Email.trim(),
    };
  } else if (action.type === "ENTERED-PASSWORD") {
    return {
      ...state,
      enteredPassword: action.password.trim(),
    };
  } else if (action.type === "CONFIRM-PASSWORD") {
    return {
      ...state,
      confirmPassword: action.confirmPassword.trim(),
    };
  } else if (action.type === "ENTERED-USERNAME") {
    return {
      ...state,
      username: action.username.trim(),
    };
  } else if (action.type === "CLEAR-FORM") {
    console.log("Clearform");
    return userState;
  }
};

const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Test -------------------------- The current component ----------------------------------
const SocialButtonData = ["Google", "Facebook", "Twitter", "Github"];
const SignupForm = () => {
  // Using the custom Hook to set the loading state on the form submission
  const { isLoading, setIsLoading } = useLoading();

  // For the userState in the App
  const [currentUserState, dispatch] = useReducer(userStateReducer, userState);

  const {
    showPassword,
    showConfirmPassword,
    username,
    enteredEmail,
    enteredPassword,
    confirmPassword,
  } = currentUserState;

  const navigate = useNavigate();

  // Test ----------------- Form validation logic ------------
  const getEnteredPassword = (event) => {
    dispatch({
      type: "ENTERED-PASSWORD",
      password: event.target.value,
    });
  };

  const toggleShowPassword = () => {
    dispatch({ type: "SHOW-PASSWORD" });
  };

  const getEnteredConfirmPassword = (event) => {
    dispatch({
      type: "CONFIRM-PASSWORD",
      confirmPassword: event.target.value,
    });
  };

  const toggleShowConfirmPassword = () => {
    dispatch({ type: "SHOW-CONFIRM-PASSWORD" });
  };

  const isFormValidHandler = async () => {
    if (
      username === "" ||
      enteredEmail === "" ||
      enteredPassword === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please enter all the details");
    } else if (enteredPassword !== confirmPassword) {
      toast.error("Password doesn't match");
    } else if (!validateEmail(enteredEmail)) {
      toast.error("Please enter correct email");
    } else {
      setIsLoading(true);
      // Sending the data to the backend using the fetch API -----> Getting req.body as response
      const data = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Converts the JS object to JSON
        body: JSON.stringify({
          username,
          enteredEmail,
          enteredPassword,
          confirmPassword,
        }),
      });

      // Getting the response from the above fetch request
      const response = await data.json();
      console.log(
        "Response on sending Sign up Form data",
        response,
        "Response Error",
        response.error
      );

      if (response.error === undefined) {
        toast.success("User successfully signed up");
        navigate("/login");
        // Clearing the data in the form
        dispatch({ type: "CLEAR-FORM" });
      } else {
        toast.error(response.error || "Error found");
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
            top: "55%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CardContent>
            {/* Heading and the subheading for the Card Box */}
            <Box>
              <HeadingContent heading="Sign Up">
                Create your account to get Started
              </HeadingContent>
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

            {/* For dividing the Social Media Login and Email Password Login */}
            <Divider textAlign="center">OR</Divider>

            {/* Contains the Email, Password, Login, New Users Section */}
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Common
                    id="username"
                    value={username}
                    onChange={(event) => {
                      dispatch({
                        type: "ENTERED-USERNAME",
                        username: event.target.value,
                      });
                    }}
                  ></Common>
                </Grid>

                <Grid item xs={6}>
                  <Common
                    id="email"
                    value={enteredEmail}
                    onChange={(event) => {
                      dispatch({
                        type: "ENTERED-EMAIL",
                        Email: event.target.value,
                      });
                    }}
                  ></Common>
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
                    type={`${showPassword ? "text" : "password"}`}
                    onChange={getEnteredPassword}
                    InputProps={{
                      endAdornment: showPassword ? (
                        <VisibilityIcon
                          onClick={toggleShowPassword}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        ></VisibilityIcon>
                      ) : (
                        <VisibilityOffIcon
                          onClick={toggleShowPassword}
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
                    value={confirmPassword}
                    fullWidth
                    placeholder="Confirm your password"
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    onChange={getEnteredConfirmPassword}
                    InputProps={{
                      endAdornment: showConfirmPassword ? (
                        <VisibilityIcon
                          onClick={toggleShowConfirmPassword}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        ></VisibilityIcon>
                      ) : (
                        <VisibilityOffIcon
                          onClick={toggleShowConfirmPassword}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        ></VisibilityOffIcon>
                      ),
                    }}
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton onClick={isFormValidHandler}>
                    Sign Up
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
                    <Typography>Already have an account ?</Typography>
                    <HoverLinkTypography link="/login">
                      Login
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
export default SignupForm;
