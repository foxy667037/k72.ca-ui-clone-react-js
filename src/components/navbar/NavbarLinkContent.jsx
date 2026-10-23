import { NavLink } from "react-router";

const NavbarLinkContent = ({ linkName, linkPath }) => {
  return (
    <>
      <NavLink to={linkPath} className="relative h-full w-full cursor-pointer">
        <div className="absolute w-full h-0 bg-(--primary-color) z-0 inset-0 transition-all group-hover:h-full"></div>
        <div className="text-white text-xl font-[Lausanne-500] uppercase h-full w-full flex items-end pl-2.25 group-hover:text-black">
          <span className="uppercase z-10">{linkName}</span>
        </div>
      </NavLink>
    </>
  );
};

export default NavbarLinkContent;
