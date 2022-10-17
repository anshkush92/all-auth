// Test -------------------------- Importing the Packages ---------------------------------
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const NavBarButtonsDesktop = () => {
  const Pages = ["News", "Weather", "Excuses"];
  const navigate = useNavigate();

  return (
    <>
      {Pages.map((page, index) => (
        <Button
          key={index}
          variant="standard"
          sx={{ color: "white", p: 0, minWidth: 0 }}
          onClick={() => navigate(`/${page.toLowerCase()}`)}
        >
          {page}
        </Button>
      ))}
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default NavBarButtonsDesktop;
