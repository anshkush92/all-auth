// Test -------------------------- Importing the Packages ---------------------------------
import { useCallback, useState } from "react";

// Test -------------------------- Importing the styles / other components ----------------
import UserContext from "./User.context";

// Test -------------------------- The current component ----------------------------------
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // For checking whether the JWT Token in Local Storage corresponds to any user or not
  // Making sure that it only runs when the dependencies changes
  const checkValidUser = useCallback(async (token) => {
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
    } else {
      setUser(undefined);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, checkValidUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default UserContextProvider;
