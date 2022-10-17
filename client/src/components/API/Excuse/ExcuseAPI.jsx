// Test -------------------------- Importing the Packages ---------------------------------
import { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import UserContext from "../../../app/UserContext/User.context";

// Test -------------------------- The current component ----------------------------------

const ExcuseAPI = () => {
  // Setting the state of the Excuse
  const [excuseData, setExcuseData] = useState([]);

  // Setting the User Validity using the Context
  const { user } = useContext(UserContext);

  // Making Request to the Excuse API if the User is Logged In
  const excuseApiRequest = async () => {
    const excuseAPIResponse = await fetch(
      "https://excuser.herokuapp.com/v1/excuse"
    );
    const excuseAPIData = await excuseAPIResponse.json();
    console.log(excuseAPIData);
    setExcuseData(excuseAPIData);
  };

  // The authentication should be done on the backend not on the frontend so using the Authorization Header
  useEffect(() => {
    excuseApiRequest();
    return () => {
      console.log("Cleanup function from Excuse API.jsx");
    };
  }, []);

  return (
    <>
      {user !== undefined
        ? excuseData.length
          ? excuseData?.map((excuse, index) => (
              <Box key={index}>
                <Typography variant="h6">
                  Category : {excuse.category}
                </Typography>
                <Typography variant="h6">Excuse : {excuse.excuse}</Typography>
              </Box>
            ))
          : "Fetching Data from API ...."
        : "User is Not Logged In"}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default ExcuseAPI;
