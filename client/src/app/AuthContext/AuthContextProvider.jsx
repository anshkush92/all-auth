// Test -------------------------- Importing the Packages ---------------------------------
import { useState } from "react";

// Test -------------------------- Importing the styles / other components ----------------
import AuthContext from "./AuthContext";

// Test -------------------------- The current component ----------------------------------
const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default AuthContextProvider;
