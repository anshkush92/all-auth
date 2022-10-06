import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Excuses from "./pages/Excuse/Excuses";
import News from "./pages/News/News";
import Weather from "./pages/Weather/Weather";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

const App = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/excuses" element={<Excuses></Excuses>}></Route>
        <Route path="/news" element={<News></News>}></Route>
        <Route path="/weather" element={<Weather></Weather>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="*" element={<h1>Error 404</h1>}></Route>
      </Routes>
    </Box>
  );
};

export default App;
