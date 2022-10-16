// Test -------------------------- Importing the Packages ---------------------------------
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const ExcuseAPI = () => {
  const [excuseData, setExcuseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExcuseAPI = async () => {
      const data = await fetch("https://excuser.herokuapp.com/v1/excuse");
      const response = await data.json();
      console.log(response);
      setExcuseData(response);
    };

    // Asyncrhously catching any error
    fetchExcuseAPI().catch(console.error);

    return () => {
      console.log("Cleanup function from Excuse API.jsx");
    };
  }, []);

  return (
    <>
      {localStorage.getItem("jwtAuthToken")
        ? excuseData?.map((excuse, index) => (
            <Box key={index}>
              <Typography variant="h6">Category : {excuse.category}</Typography>
              <Typography variant="h6">Excuse : {excuse.excuse}</Typography>
            </Box>
          ))
        : navigate("/login")}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default ExcuseAPI;
