// Test -------------------------- Importing the Packages ---------------------------------
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
// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const SignupForm = () => {
  const navigate = useNavigate();
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

        {/* For dividing the Social Media Login and UserName Password Login */}
        <Divider textAlign="center">OR</Divider>

        {/* Contains the UserName, Password, Login, New Users Section */}
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="username">
                Username
              </InputLabel>
              <TextField id="username" size="small" fullWidth></TextField>
            </Grid>

            <Grid item xs={12}>
              <InputLabel shrink htmlFor="password">
                Password
              </InputLabel>
              <TextField id="password" size="small" fullWidth></TextField>
            </Grid>

            <Grid item xs={12}>
              <InputLabel shrink htmlFor="confirm-password">
                Confirm Password
              </InputLabel>
              <TextField
                id="confirm-password"
                size="small"
                fullWidth
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
