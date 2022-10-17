// Test -------------------------- Importing the Packages ---------------------------------
import { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import UserContext from "../../../app/UserContext/User.context";

// Test -------------------------- The current component ----------------------------------

const NewsAPI = () => {
  // Setting the state of the News
  const [newsData, setNewsData] = useState([]);

  // Setting the User Validity using the Context
  const { user } = useContext(UserContext);

  // Making Request to the News API if the User is Logged In
  const newsApiRequest = async () => {
    const newsAPIResponse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    const newsAPIData = await newsAPIResponse.json();
    console.log(newsAPIData);
    setNewsData(newsAPIData.articles);
  };

  // The authentication should be done on the backend not on the frontend so using the Authorization Header
  useEffect(() => {
    newsApiRequest();
    return () => {
      console.log("Cleanup function from News API.jsx");
    };
  }, []);

  return (
    <>
      {user !== undefined
        ? newsData.length
          ? newsData?.map((news, index) => (
              <Box key={index} sx={{ mt: 2, mb: 2 }}>
                <Box
                  component="img"
                  alt={news.title}
                  src={news.urlToImage}
                  sx={{ width: "400px" }}
                ></Box>
                <Typography variant="h6">Title : {news.title}</Typography>
                <Typography variant="body1">
                  Content : {news.content}
                </Typography>
                <Typography variant="body1">
                  Description : {news.description}
                </Typography>
                <Typography variant="caption1">
                  Source :{" "}
                  <a href={news.url} target="_blank" rel="noreferrer">
                    {news.source.name}
                  </a>
                </Typography>
              </Box>
            ))
          : "Fetching Data from API ...."
        : "User is Not Logged In"}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default NewsAPI;
