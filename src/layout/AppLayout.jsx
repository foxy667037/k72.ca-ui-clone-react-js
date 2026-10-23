import { Outlet } from "react-router";
import { BarsAnimation, NavbarComponent } from "../components/index.js";
import NavbarMenuContextProvider from "../context/navbarMenu/navbarMenuContextProvider.jsx";

const AppLayout = () => {
  return (
    <NavbarMenuContextProvider>
      <BarsAnimation>
        <NavbarComponent />
        <Outlet />
      </BarsAnimation>
    </NavbarMenuContextProvider>
  );
};

export default AppLayout;
