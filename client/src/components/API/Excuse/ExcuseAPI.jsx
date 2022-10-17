// Test -------------------------- Importing the Packages ---------------------------------
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const ExcuseAPI = () => {
  const [excuseData, setExcuseData] = useState([]);

  // Checks whether the user is authenticated or not using the backend
  const isAuthenticatedUser = async () => {
    const token = localStorage.getItem("jwtAuthToken");

    // Sends the request to the /user to check whether the user is authenticated in or not
    const response = await fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // Getting the data from response in JS Object
    const data = await response.json();
    console.log(data);

    // Fetch the Data from the API if there is no ERROR object in the Response
    if (data.error === undefined) {
      const excuseAPIResponse = await fetch(
        "https://excuser.herokuapp.com/v1/excuse"
      );
      const excuseAPIData = await excuseAPIResponse.json();
      console.log(excuseAPIData);
      setExcuseData(excuseAPIData);
    } else {
      console.log(data);
    }
  };

  // The authentication should be done on the backend not on the frontend so using the Authorization Header
  useEffect(() => {
    // Using the callback to resovle the promise
    isAuthenticatedUser()
      .then(console.log("Ran isAuthenticatedUser function"))
      .catch(console.error);

    return () => {
      console.log("Cleanup function from Excuse API.jsx");
    };
  }, []);

  return (
    <>
      {excuseData.length
        ? excuseData?.map((excuse, index) => (
            <Box key={index}>
              <Typography variant="h6">Category : {excuse.category}</Typography>
              <Typography variant="h6">Excuse : {excuse.excuse}</Typography>
            </Box>
          ))
        : "No Data or User is Not Logged In"}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default ExcuseAPI;
