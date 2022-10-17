// Test -------------------------- Importing the Packages ---------------------------------
import { useEffect, useState, useContext } from "react";
import { Typography } from "@mui/material";

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
      {user !== undefined ? (
        weatherData.length !== 0 ? (
          <>
            <Typography variant="h6">
              Country: {weatherData.location?.country}
            </Typography>

            <Typography variant="h6">
              Location: {weatherData.location?.name}
            </Typography>

            <Typography variant="body1">
              Wind: {weatherData.current?.gust_kph} KPH or{" "}
              {weatherData.current.gust_mph} MPH
            </Typography>

            <Typography variant="body1">
              Humidity: {weatherData.current?.humidity} %
            </Typography>

            <Typography variant="body1">
              Temperature: {weatherData.current?.temp_c} Celsius or{" "}
              {weatherData.current.temp_f} Fahrenheit
            </Typography>

            <Typography variant="body1">
              UV: {weatherData.current?.uv} %
            </Typography>
          </>
        ) : (
          "Fetching Data from API ...."
        )
      ) : (
        "User is Not Logged In"
      )}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default WeatherAPI;
