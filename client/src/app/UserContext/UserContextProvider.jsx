// Test -------------------------- Importing the Packages ---------------------------------
import { useCallback, useState, useContext } from "react";

// Test -------------------------- Importing the styles / other components ----------------
import AuthContext from "../AuthContext/AuthContext";
import UserContext from "./User.context";

// Test -------------------------- The current component ----------------------------------
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const { loginHandler, logoutHandler } = useContext(AuthContext);

  const token = localStorage.getItem("jwtAuthToken");
  // For checking whether the JWT Token in Local Storage corresponds to any user or not
  // Making sure that it only runs when the dependencies changes
  const checkValidUser = useCallback(async () => {
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

    // Setting the data of the user -----> If user found sets it otherwise remains undefined
    if (data.user !== undefined) {
      setUser(data.user);
      loginHandler();
    } else {
      setUser(undefined);
      logoutHandler();
    }
  }, [token, loginHandler, logoutHandler]);

  // For removing the Token as well as the cookie associated with the token
  const removeValidUser = async () => {
    // When clicking on the Logout button then Run this function
    // Gives the token to the backend, to remove it aas well as the cookie
    const response = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    // Awaiting for the response from server which will be the user
    const data = await response.json();

    // Logging the response from the server
    console.log(data);

    // Changing the state of the isLogin to false
    logoutHandler();

    // Checking whether we got the user or not and accordingly removing the Local Storage Auth Token
    if (data !== undefined) {
      localStorage.removeItem("jwtAuthToken");
    }
  };

  return (
    <UserContext.Provider value={{ user, checkValidUser, removeValidUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default UserContextProvider;
