import "./App.css";

import { useContext, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Excuses from "./pages/Excuse/Excuses";
import News from "./pages/News/News";
import Weather from "./pages/Weather/Weather";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import UserContext from "./app/UserContext/User.context";

const App = () => {
  const { checkValidUser } = useContext(UserContext);
  const token = localStorage.getItem("jwtAuthToken");

  useEffect(() => {
    checkValidUser();
  }, [checkValidUser, token]);

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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </Box>
  );
};

export default App;
