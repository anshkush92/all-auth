// Test -------------------------- Importing the Packages ---------------------------------
import { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import UserContext from "../../../app/UserContext/User.context";

// Test -------------------------- The current component ----------------------------------

const WeatherAPI = () => {
  // Setting the state of the Weather
  const [weatherData, setWeatherData] = useState([]);

  // Setting the User Validity using the Context
  const { user } = useContext(UserContext);

  // Making Request to the Weather API if the User is Logged In
  const weatherApiRequest = async () => {
    const weatherAPIResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=London&aqi=no`
    );
    const weatherAPIData = await weatherAPIResponse.json();
    console.log(weatherAPIData);
    setWeatherData(weatherAPIData);
  };

  // The authentication should be done on the backend not on the frontend so using the Authorization Header
  useEffect(() => {
    weatherApiRequest();
    return () => {
      console.log("Cleanup function from Weather API.jsx");
    };
  }, []);

  return (
    <>
      {user !== undefined
        ? weatherData.length
          ? weatherData?.map((weather, index) => (
              <Box key={index}>
                <Typography variant="h6">
                  Category : {weather.category}
                </Typography>
                <Typography variant="h6">
                  Weather : {weather.weather}
                </Typography>
              </Box>
            ))
          : "Fetching Data from API ...."
        : "User is Not Logged In"}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default WeatherAPI;
