// Test -------------------------- Importing the Packages ---------------------------------
import { Box } from "@mui/material";

// Test -------------------------- Importing the styles / other components ----------------
import Navbar from "../../components/Navbar/Navbar";
import NewsAPI from "../../components/API/News/NewsAPI";

// Test -------------------------- The current component ----------------------------------
const News = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <NewsAPI></NewsAPI>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default News;
