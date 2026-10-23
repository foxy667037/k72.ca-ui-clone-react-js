import React from "react";
import NavbarMenuContext from "./NavbarMenuContext";

const NavbarMenuContextProvider = ({ children }) => {
  const [navbarMenuIsOpened, setNavbarMenuIsOpened] = React.useState(false);

  const navbarMenuOpen = () => setNavbarMenuIsOpened(true);

  const navbarMenuClose = () => setNavbarMenuIsOpened(false);

  return (
    <NavbarMenuContext.Provider
      value={{
        navbarMenuIsOpened: navbarMenuIsOpened,
        navbarMenuOpen: navbarMenuOpen,
        navbarMenuClose: navbarMenuClose,
      }}
    >
      {children}
    </NavbarMenuContext.Provider>
  );
};

export default NavbarMenuContextProvider;
