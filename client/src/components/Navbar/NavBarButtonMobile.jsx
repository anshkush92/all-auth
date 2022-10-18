// Test -------------------------- Importing the Packages ---------------------------------
import { List, ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Test -------------------------- Importing the styles / other components ----------------

// Test -------------------------- The current component ----------------------------------
const NavBarButtonsMobile = () => {
  const Pages = ["News", "Weather", "Excuses"];
  const navigate = useNavigate();

  return (
    <>
      <List>
        {Pages.map((page, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => navigate(`/${page.toLowerCase()}`)}>
              {page}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default NavBarButtonsMobile;
