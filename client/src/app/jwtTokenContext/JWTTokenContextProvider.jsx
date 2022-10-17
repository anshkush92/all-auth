// Test -------------------------- Importing the Packages ---------------------------------
import { useState } from "react";

// Test -------------------------- Importing the styles / other components ----------------
import JWTTokenContext from "./JWTTokenContext";

// Test -------------------------- The current component ----------------------------------
const JWTTokenContextProvider = ({ children }) => {
  const [jwtAuthToken, setJwtAuthToken] = useState(undefined);

  const addJwtAuthToken = (token) => {
    setJwtAuthToken(token);
    localStorage.setItem("jwtAuthToken", token);
  };

  const removeJwtAuthToken = () => {
    setJwtAuthToken(undefined);
    localStorage.removeItem("jwtAuthToken");
  };

  const getJwtAuthToken = () => {
    localStorage.getItem("jwtAuthToken");
  };

  return (
    <JWTTokenContext.Provider
      value={{
        jwtAuthToken,
        addJwtAuthToken,
        removeJwtAuthToken,
        getJwtAuthToken,
      }}
    >
      {children}
    </JWTTokenContext.Provider>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default JWTTokenContextProvider;
