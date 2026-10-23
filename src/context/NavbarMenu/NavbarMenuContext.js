import React from "react";

const NavbarMenuContext = React.createContext({
  navbarMenuIsOpened: false,
  navbarMenuOpen: () => {},
  navbarMenuClose: () => {},
});

export default NavbarMenuContext;
