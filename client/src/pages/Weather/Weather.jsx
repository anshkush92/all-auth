// Test -------------------------- Importing the Packages ---------------------------------
import { Box } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import Navbar from "../../components/Navbar/Navbar";
import WeatherAPI from "../../components/API/Weather/WeatherAPI";

// Test -------------------------- The current component ----------------------------------
const Weather = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <WeatherAPI></WeatherAPI>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default Weather;
