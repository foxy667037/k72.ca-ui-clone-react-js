import React from "react";
import NavbarMenuContext from "./NavbarMenuContext";

const useNavbarMenu = () => {
  return React.useContext(NavbarMenuContext);
};

export default useNavbarMenu;